import "server-only";

import { OpenAI } from "openai";
import type { Stream } from "openai/core/streaming.mjs";
import type { ChatCompletionChunk } from "openai/resources/index.mjs";

import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_KEY } from "@/env/private";

import { SYSTEM_PROMPT } from "./config";

const ai = new OpenAI({
  apiKey: CLOUDFLARE_API_KEY,
  baseURL: `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
});

export async function cfChatStream(
  prompt: string,
): Promise<Stream<ChatCompletionChunk>> {
  const chatStream = await ai.chat.completions.create({
    model: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    stream: true,
  });

  return chatStream;
}

// (async function test() {
//   const stream = await chatStream("1+1=?");
//   for await (const chunk of stream) {
//     console.log(chunk);
//   }
// })();
