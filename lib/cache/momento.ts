import {
  CacheClient,
  CacheDeleteResponse,
  CacheGetResponse,
  CacheSetResponse,
} from "@gomomento/sdk";

import { CacheError } from "./error";

import { CacheTTL } from "./index";

import { MOMENTO_API_KEY } from "@/env/private";
import { CacheInterface } from "@/types/cache";

const CACHE_NAME = "blog"; // Name of the cache to use
let momentoClient: CacheClient | null;

export function getCacheClient(): CacheClient {
  if (momentoClient) return momentoClient;

  if (!MOMENTO_API_KEY) {
    throw new Error("MOMENTO_API_KEY environment variable not set");
  }

  try {
    momentoClient = new CacheClient({ defaultTtlSeconds: CacheTTL });

    return momentoClient;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Initialization momento failed:", e);
    throw new CacheError("get", undefined, e);
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = getCacheClient();
    const response = await client.get(CACHE_NAME, key);

    if (response.type === CacheGetResponse.Error) {
      throw new Error(`${response.errorCode()} ${response.toString()}`);
    }

    const data = response.value();

    if (data === undefined) {
      return null;
    }

    return JSON.parse(data) as T;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`get '${key}' from momento cache failed`, e);
    throw new CacheError("get", key, e);
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds: number,
): Promise<boolean> {
  try {
    const client = getCacheClient();

    const response = await client.set(CACHE_NAME, key, JSON.stringify(value), {
      ttl: ttlSeconds,
    });

    if (response.type === CacheSetResponse.Error) {
      throw new Error(`${response.errorCode()} ${response.toString()}`);
    }

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`set '${key}' cache failed: `, e);
    throw new CacheError("set", key, e);
  }
}

export async function cacheDelete(key: string): Promise<boolean> {
  try {
    const client = getCacheClient();

    const response = await client.delete(CACHE_NAME, key);

    if (response.type === CacheDeleteResponse.Error) {
      throw new Error(`${response.errorCode} ${response.toString}`);
    }

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`delete '${key}' from momento cache failed:`, e);
    throw new CacheError("delete", key, e);
  }
}

const momentoCache: CacheInterface = {
  cacheGet,
  cacheSet,
  cacheDelete,
};

export default momentoCache;
