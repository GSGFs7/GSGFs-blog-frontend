import {
  CacheClient,
  CacheGet,
  CacheSet,
  Configurations,
  CredentialProvider,
} from "@gomomento/sdk";

const CACHE_NAME = "blog"; // Name of the cache to use
const TTL = 60 * 30; // 30 minutes
let momentoClient: CacheClient | null = null;

export function getCacheClient(): CacheClient {
  if (momentoClient) return momentoClient;

  const MOMENTO_API_KEY = process.env.MOMENTO_API_KEY;

  if (!MOMENTO_API_KEY) {
    throw new Error("MOMENTO_API_KEY environment variables not set");
  }

  try {
    momentoClient = new CacheClient({
      configuration: Configurations.Laptop.v1(),
      credentialProvider:
        CredentialProvider.fromEnvironmentVariable("MOMENTO_API_KEY"),
      defaultTtlSeconds: TTL,
    });

    return momentoClient;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Initialization momento failed:", e);
    throw e;
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = getCacheClient();
    const response = await client.get(CACHE_NAME, key);

    if (response instanceof CacheGet.Hit) {
      return JSON.parse(response.valueString()) as T;
    }

    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`get '${key}' from momento cache failed`, e);

    return null;
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds?: number,
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

    return false;
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

    return false;
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

    return false;
  }
}
