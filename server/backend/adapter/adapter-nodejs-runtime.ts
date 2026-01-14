import "server-only";

import { createHmac, randomBytes } from "node:crypto";

import { SERVER_SECRET_KEY } from "@/env/private";
import { cacheGet, cacheSet } from "@/lib/cache";

export async function generateAuthToken(): Promise<string> {
  const timestamp = Math.floor(globalThis.Date.now() / 1000 / 10); // 10s

  let message = randomBytes(8).toString("hex");
  while (await cacheGet(`auth_token:message:${message}`)) {
    message = randomBytes(8).toString("hex");
  }
  await cacheSet(`auth_token:message:${message}`, true, 30);

  if (!SERVER_SECRET_KEY) {
    console.error("SERVER_SECRET_KEY not found");
    return "";
  }

  const signature = createHmac("sha256", SERVER_SECRET_KEY)
    .update(timestamp.toString())
    .update(message)
    .digest("hex");

  return Buffer.from(
    JSON.stringify({
      message,
      signature,
    }),
  ).toString("base64");
}
