import {
  CacheClient,
  CacheGet,
  CacheSet,
  Configurations,
  CredentialProvider,
} from "@gomomento/sdk";

import { CacheTTL } from ".";

import { CacheError, CacheInterface } from "@/types/cache";

const CACHE_NAME = "blog"; // Name of the cache to use
let momentoClient: CacheClient | null = null;

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

export function getCacheClient(): CacheClient {
  if (momentoClient) return momentoClient;

  const MOMENTO_API_KEY = process.env.MOMENTO_API_KEY;

  if (!MOMENTO_API_KEY) {
    throw new Error("MOMENTO_API_KEY environment variables not set");
  }

  try {
    momentoClient = new CacheClient({
      configuration: Configurations.Laptop.v1(),
      credentialProvider: CredentialProvider.fromString(MOMENTO_API_KEY),
      defaultTtlSeconds: CacheTTL,
    });

    return momentoClient;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Initialization momento failed:", e);
    throw createCacheError("get", undefined, e);
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = getCacheClient();
    const response = await client.get(CACHE_NAME, key);

    if (response instanceof CacheGet.Hit) {
      try {
        return JSON.parse(response.valueString()) as T;
      } catch (parseError) {
        // eslint-disable-next-line no-console
        console.error(
          `Failed to parse cached value for key '${key}': `,
          parseError,
        );
        throw createCacheError("get", key, parseError);
      }
    }

    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`get '${key}' from momento cache failed`, e);
    throw createCacheError("get", key, e);
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds: number = CacheTTL,
): Promise<boolean> {
  try {
    const client = getCacheClient();
    const response = await client.set(CACHE_NAME, key, JSON.stringify(value), {
      ttl: ttlSeconds,
    });

    return response instanceof CacheSet.Success;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`set '${key}' cache failed: `, e);
    throw createCacheError("set", key, e);
  }
}

export async function cacheDelete(key: string): Promise<boolean> {
  try {
    const client = getCacheClient();

    await client.delete(CACHE_NAME, key);

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`delete '${key}' from momento cache failed:`, e);
    throw createCacheError("delete", key, e);
  }
}

export async function flushCache(): Promise<boolean> {
  try {
    const client = getCacheClient();

    await client.flushCache(CACHE_NAME);

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("flush momento cache failed:", e);
    throw createCacheError("flush", undefined, e);
  }
}

const momentoCache: CacheInterface = {
  cacheGet,
  cacheSet,
  cacheDelete,
  flushCache,
};

export default momentoCache;
