import { SERVER_SECRET_KEY } from "@/env/private";

async function randomBytes(length: number): Promise<Buffer> {
  const array = new Uint8Array(length);
  const crypto = globalThis.crypto;

  crypto.getRandomValues(array);

  return Buffer.from(array);
}

async function createHMAC(
  secret: string,
  ...messages: string[]
): Promise<string> {
  const encoder = new TextEncoder();
  const crypto = globalThis.crypto;
  const secretKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const message = messages.join("");
  const signature = await crypto.subtle.sign(
    "HMAC",
    secretKey,
    encoder.encode(message),
  );

  return Buffer.from(signature).toString("hex");
}

export async function generateAuthToken(): Promise<string> {
  const timestamp = Math.floor(globalThis.Date.now() / 1000 / 10); // 10s
  const message = (await randomBytes(8)).toString("hex");

  if (!SERVER_SECRET_KEY) {
    console.error("SERVER_SECRET_KEY not found");

    return "";
  }

  const signature = await createHMAC(
    SERVER_SECRET_KEY,
    timestamp.toString(),
    message,
  );

  return Buffer.from(
    JSON.stringify({
      message,
      signature,
    }),
  ).toString("base64");
}
