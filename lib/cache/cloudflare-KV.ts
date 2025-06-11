import { env } from "cloudflare:workers";

import { CacheTTL } from ".";

import { CacheError, CacheInterface } from "@/types/cache";

function createCacheError(
  operation: CacheError["operation"],
  key: string | undefined,
  originalError: unknown,
): CacheError {
  const error = new Error(
    `Cache ${operation} operation failed${key ? ` for key '${key}'` : ""}`,
  ) as CacheError;

  error.operation = operation;
  error.key = key;
  error.originalError = originalError;

  return error;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const res = await env.NEXT_INC_CACHE_KV.get<T>(key, { type: "json" });

    return res;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Get '${key}' cache failed: `, e);
    throw createCacheError("get", key, e);
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds: number = CacheTTL,
): Promise<boolean> {
  try {
    await env.NEXT_INC_CACHE_KV.put(key, JSON.stringify(value), {
      expirationTtl: ttlSeconds,
    });

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Set '${key}' cache failed: `, e);
    throw createCacheError("set", key, e);
  }
}

export async function cacheDelete(key: string): Promise<boolean> {
  try {
    await env.NEXT_INC_CACHE_KV.delete(key);

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Delete '${key}' cache failed: `, e);
    throw createCacheError("delete", key, e);
  }
}

export async function flushCache(): Promise<boolean> {
  // eslint-disable-next-line no-console
  console.warn("Cloudflare KV does not support flush operation");

  return false;
}

const cloudflareKVCache: CacheInterface = {
  cacheGet,
  cacheSet,
  cacheDelete,
  flushCache,
};

export default cloudflareKVCache;
