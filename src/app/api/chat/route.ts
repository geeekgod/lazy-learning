import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const { content } = await req.json();


  if (content == "") {
    return new Response("Please write something", { status: 400 });
  }

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
        And remember not to respond with too many content, keep is short and crisp`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: content,
      },
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
