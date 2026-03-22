import "server-only";

import {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_API_KEY,
  CLOUDFLARE_KV_NAMESPACE_ID,
} from "@/env/private";
import { FetchError, fc } from "@/lib/fetchClient";
import type { CacheInterface } from "@/types/cache";

import { CacheTTL } from "./core";
import { CacheError } from "./error";

class CloudflareKVHttpClient {
  private readonly accountId: string;
  private readonly apiToken: string;
  private readonly namespaceId: string;
  private readonly baseUrl: string;

  constructor(accountId: string, apiToken: string, namespaceId: string) {
    this.accountId = accountId;
    this.apiToken = apiToken;
    this.namespaceId = namespaceId;
    this.baseUrl = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values`;
  }

  async get(key: string): Promise<string | null> {
    try {
      return await fc.get<string>(`${this.baseUrl}/${key}`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });
    } catch (e) {
      if (e instanceof FetchError && e.status === 404) {
        return null;
      }

      throw e;
    }
  }

  async set(
    key: string,
    value: string,
    ttlSeconds: number = CacheTTL,
  ): Promise<void> {
    const url = new URL(`${this.baseUrl}/${key}`);
    if (ttlSeconds > 0) {
      url.searchParams.set("expiration_ttl", ttlSeconds.toString());
    }

    await fc.put(url.toString(), value, {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "text/plain",
      },
    });
  }

  async delete(key: string): Promise<void> {
    try {
      await fc.delete(`${this.baseUrl}/${key}`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });
    } catch (e) {
      if (e instanceof FetchError && e.status === 404) {
        return;
      }

      throw e;
    }
  }
}

let kvClient: CloudflareKVHttpClient | null = null;

function createCacheError(
  operation: CacheError["operation"],
  key: string | undefined,
  originalError: unknown,
): CacheError {
  return new CacheError(operation, key, originalError);
}

function getKVClient(): CloudflareKVHttpClient {
  if (kvClient) return kvClient;

  if (!CLOUDFLARE_ACCOUNT_ID) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID environment variable not set");
  }

  if (!CLOUDFLARE_API_KEY) {
    throw new Error("CLOUDFLARE_API_KEY environment variable not set");
  }

  if (!CLOUDFLARE_KV_NAMESPACE_ID) {
    throw new Error("CLOUDFLARE_KV_NAMESPACE_ID environment variable not set");
  }

  kvClient = new CloudflareKVHttpClient(
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_API_KEY,
    CLOUDFLARE_KV_NAMESPACE_ID,
  );

  return kvClient;
}

async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = getKVClient();
    const response = await client.get(key);

    if (response === null) {
      return null;
    }

    try {
      return JSON.parse(response) as T;
    } catch (parseError) {
      console.error(
        `Failed to parse cached value for key '${key}': `,
        parseError,
      );
      throw createCacheError("get", key, parseError);
    }
  } catch (e) {
    console.error(`Get '${key}' from Cloudflare KV (HTTP) failed`, e);
    throw createCacheError("get", key, e);
  }
}

async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds: number = CacheTTL,
): Promise<boolean> {
  try {
    const client = getKVClient();
    await client.set(key, JSON.stringify(value), ttlSeconds);
    return true;
  } catch (e) {
    console.error(`Set '${key}' to Cloudflare KV (HTTP) failed`, e);
    throw createCacheError("set", key, e);
  }
}

async function cacheDelete(key: string): Promise<boolean> {
  try {
    const client = getKVClient();
    await client.delete(key);
    return true;
  } catch (e) {
    console.error(`Delete '${key}' from Cloudflare KV (HTTP) failed`, e);
    throw createCacheError("delete", key, e);
  }
}

const cloudflareKVHttpCache: CacheInterface = {
  cacheGet,
  cacheSet,
  cacheDelete,
};

export default cloudflareKVHttpCache;
