import "server-only";

import { createHash, randomBytes } from "node:crypto";

import { Fernet } from "@gsgfs/fernet";

import { CLIENT_ID, SERVER_SECRET_KEY } from "@/env/private";
import { cacheGet, cacheSet } from "@/lib/cache";

const FERNET_KEY = createHash("sha-256").update(SERVER_SECRET_KEY).digest();
const f = new Fernet(FERNET_KEY.toString("base64url"));

function generateAuthCacheKey(client_id: string, nonce: string) {
  return `auth_token:${client_id}:${nonce}`;
}

export async function generateAuthToken(): Promise<string> {
  const client_id = CLIENT_ID ?? "blog_front_default";

  // NOTE: KV not support CAS
  let nonce = randomBytes(16).toString();
  while (await cacheGet(generateAuthCacheKey(client_id, nonce))) {
    nonce = randomBytes(16).toString();
    await cacheSet(generateAuthCacheKey(client_id, nonce), nonce);
  }

  return f.encrypt(`${client_id}:${nonce}`);
}
