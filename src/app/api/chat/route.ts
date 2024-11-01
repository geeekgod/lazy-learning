import { createChat, getChatsByUser } from "@/lib/db";
import { getApiUser } from "@/lib/session";
import { groq } from "@ai-sdk/groq";
import { CoreMessage, streamText } from "ai";

export async function POST(req: Request) {
  const user = await getApiUser();

  if (!user || user instanceof Response) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get the content from the request
  const { content } = await req.json();

  if (content == "") {
    return new Response("Please write something", { status: 400 });
  }

  // Save the chat message to the database
  const newMessage = await createChat({
    userId: user.id,
    message: content,
    user: "user",
    timestamp: new Date().toISOString(),
  });

  console.log("newMessage", newMessage);

  // Get the messages for the user
  let chats = await getChatsByUser(user.id);
  if (!chats) chats = [];
  console.log(chats);

  const messages: Array<CoreMessage> = chats.map((chat) => {
    return {
      role: chat.user === "user" ? "user" : "assistant",
      content: chat.message,
    };
  });

  const prompt = `Your are teacher named LazyAI an Virtual Assistant specifically designed only for Doubt Solving for Students and developed by Rishabh Singh aka GeeekGod a Software Engineer based out in Mumbai India,
        Remember you are not developed by OpenAI at all and you are not GPT or anything related to it because the response should not have any mentioning about the model, OpenAI or GPT and you have to do few things:
        1. Solve doubts
        2. Explain concepts
        3. Provide links
        4. Provide relevant examples
        5. Explain the concept in a simple way so that the student can understand easily
        6. Help the student to understand the concept
        7. Provide only relevant content
        8. Explain facts related to the concept as well
        9. Try to stick to the topic as much as possible
        Students might be asking questions to understand the concepts for exam preparation, interview preparation, project preparation, assignment preparation, homework preparation, etc.
        So you have to explain the concept in a very simple way along with maintaining the quality of the content and eliminating the need for the student to search for the concept on the internet.
        And remember not to respond with too many content, keep is short and crisp

        Important points to remember while responding to the student:
        1. If the questions is very short, then ask the student to elaborate the question
        2. If the last question is 'Ok' or 'Thank you', then ask the student if they have any more questions
        3. If the question is very long, then ask the student to break the question into smaller parts
        4. If the question is not clear, then ask the student to provide more details
        5. If the question is out of scope, then ask the student to ask the question related to the topic
        6. Don't repeat the same content again and again from previous messages
        `;

  const model = groq("llama-3.2-1b-preview");

  const { textStream } = await streamText({
    model,
    system: prompt,
    // prompt: content,
    messages,
    temperature: 0.5,
    // frequencyPenalty: 0,
    // presencePenalty: 0,
  });

  return new Response(
    new ReadableStream({
      async start(controller) {
        let text = "";
        for await (const message of textStream) {
          text += message;
          controller.enqueue(message);
        }

        // when stream is done, close the controller & also store the messages in database
        // store the response in the database

        const botMessage = await createChat({
          userId: user.id,
          message: text,
          user: "assistant",
          timestamp: new Date().toISOString(),
        });

        controller.close();
      },
    }),
    { status: 200 }
  );
}
