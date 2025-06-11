import { CacheTTL } from ".";

import { CacheError, CacheInterface } from "@/types/cache";

const CACHE_NAME = "blog"; // Name of the cache to use
let momentoClient: CacheClient | null = null;

// cloudflare worker not support sdk
class CacheClient {
  private readonly apiKey: string;
  private readonly baseurl: string;

  constructor(key: string, endpoint: string) {
    this.apiKey = key;
    if (!(endpoint.startsWith("https://") || endpoint.startsWith("http://"))) {
      this.baseurl = `https://${endpoint}/cache`;
    } else {
      this.baseurl = `${endpoint}/cache`;
    }
  }

  async get(cacheName: string, key: string) {
    const resp = await fetch(
      `${this.baseurl}/${cacheName}?key=${key}&token=${this.apiKey}`,
    );

    if (resp.status === 404) {
      return null;
    }

    if (resp.status >= 300) {
      throw new Error(`failed to retrieve item from cache: ${cacheName}`);
    }

    return await resp.text();
  }

  async set(
    cacheName: string,
    key: string,
    value: string,
    ttl_seconds: number = 30,
  ) {
    const resp = await fetch(
      `${this.baseurl}/${cacheName}?key=${key}&token=${this.apiKey}&&ttl_seconds=${ttl_seconds}`,
      {
        method: "PUT",
        body: value,
      },
    );

    if (resp.status === 404) {
      return null;
    }

    if (resp.status >= 300) {
      throw new Error(
        `failed to set item into cache message: ${resp.statusText} status: ${resp.status} cache: ${cacheName}`,
      );
    }

    return null;
  }

  async delete(cacheName: string, key: string) {
    const resp = await fetch(
      `${this.baseurl}/${cacheName}?key=${key}&token=${this.apiKey}`,
      {
        method: "DELETE",
      },
    );

    if (resp.status === 404) {
      return null;
    }

    if (resp.status >= 300) {
      throw new Error(
        `failed to delete ${key} from cache. Message: ${resp.statusText}; Status: ${resp.status} cache: ${cacheName}`,
      );
    }

    return resp;
  }
}

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
  const MOMENTO_BASE_URL = process.env.MOMENTO_BASE_URL;

  if (!MOMENTO_API_KEY) {
    throw new Error("MOMENTO_API_KEY environment variables not set");
  }

  if (!MOMENTO_BASE_URL) {
    throw new Error("MOMENTO_BASE_URL environment variables not set");
  }

  try {
    momentoClient = new CacheClient(MOMENTO_API_KEY, MOMENTO_BASE_URL);

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

    if (response === null) {
      return null;
    }

    try {
      return JSON.parse(response) as T;
    } catch (parseError) {
      // eslint-disable-next-line no-console
      console.error(
        `Failed to parse cached value for key '${key}': `,
        parseError,
      );
      throw createCacheError("get", key, parseError);
    }
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

    await client.set(CACHE_NAME, key, JSON.stringify(value), ttlSeconds);

    return true;
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

const momentoCache: CacheInterface = {
  cacheGet,
  cacheSet,
  cacheDelete,
};

export default momentoCache;
