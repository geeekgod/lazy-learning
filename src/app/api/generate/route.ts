import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  let { prompt } = await req.json();

  const systemPrompt =
    "You are an AI writing assistant that continues existing text based on context from prior text. " +
    "Give more weight/priority to the later characters than the beginning ones. " +
    "Limit your response to no more than 100 characters, but make sure to construct complete sentences.";

  const model = groq("llama-3.2-1b-preview");

  const { textStream } = await streamText({
    model,
    system: systemPrompt,
    prompt,
    temperature: 0.5,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });

  return new Response(textStream, { status: 200 });
}
