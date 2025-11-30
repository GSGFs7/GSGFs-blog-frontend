"use server";

import {
  type ContentListUnion,
  GoogleGenAI,
  HarmBlockThreshold,
  HarmCategory,
  type SafetySetting,
  type ToolListUnion,
} from "@google/genai";

import { GOOGLE_AI_API_KEY } from "@/env/private";

import { SYSTEM_PROMPT } from "./config";

const ai = new GoogleGenAI({
  apiKey: GOOGLE_AI_API_KEY,
});

const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const tools: ToolListUnion = [{ googleSearch: {}, urlContext: {} }];

interface ChatMessage {
  role: string;
  content: string;
}

export async function googleChatStream(messages: ChatMessage[]) {
  const contents: ContentListUnion = messages.map((message) => ({
    role: message.role,
    parts: [{ text: message.content }],
  }));

  const response = await ai.models.generateContentStream({
    model: "gemini-3-pro-preview",
    contents,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      safetySettings,
      tools,
    },
  });

  return response;
}

// (async function test() {
//   const stream = await googleChatStream("How LLM work?");

//   for await (const chunk of stream) {
//     console.log(chunk.text);
//   }
// })();
