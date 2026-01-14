import type { KVNamespace } from "@cloudflare/workers-types";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CacheInterface } from "@/types/cache";

import { CacheTTL } from "./core";
import { CacheError } from "./error";

function getKV(): KVNamespace {
  const cf = getCloudflareContext();
  const kv = cf.env.NEXT_INC_CACHE_KV;
  if (!kv) {
    throw new Error(
      "Cloudflare KV namespace NEXT_INC_CACHE_KV is not configured or not running on Cloudflare worker",
    );
  }
  return kv as unknown as KVNamespace;
}

function createCacheError(
  operation: CacheError["operation"],
  key: string | undefined,
  originalError: unknown,
): CacheError {
  const error = new CacheError(operation, key, originalError);

  return error;
}

async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const res = await getKV().get<T>(key, { type: "json" });

    return res;
  } catch (e) {
    console.error(`Get '${key}' cache failed: `, e);
    throw createCacheError("get", key, e);
  }
}

async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds: number = CacheTTL,
): Promise<boolean> {
  try {
    await getKV().put(key, JSON.stringify(value), {
      expirationTtl: ttlSeconds,
    });

    return true;
  } catch (e) {
    console.error(`Set '${key}' cache failed: `, e);
    throw createCacheError("set", key, e);
  }
}

async function cacheDelete(key: string): Promise<boolean> {
  try {
    await getKV().delete(key);

    return true;
  } catch (e) {
    console.error(`Delete '${key}' cache failed: `, e);
    throw createCacheError("delete", key, e);
  }
}

const cloudflareKVCache: CacheInterface = {
  cacheGet,
  cacheSet,
  cacheDelete,
};

export default cloudflareKVCache;
