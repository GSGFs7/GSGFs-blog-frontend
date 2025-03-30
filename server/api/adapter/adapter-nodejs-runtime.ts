import { createHmac, randomBytes } from "crypto";

export async function generateAuthToken(): Promise<string> {
  const timestamp = Math.floor(globalThis.Date.now() / 1000 / 10); // 10s
  const message = randomBytes(8).toString("hex");

  if (!process.env.SERVER_SECRET_KEY) {
    // eslint-disable-next-line no-console
    console.error("SERVER_SECRET_KEY not found");

    return "";
  }

  const signature = createHmac("sha256", process.env.SERVER_SECRET_KEY)
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
