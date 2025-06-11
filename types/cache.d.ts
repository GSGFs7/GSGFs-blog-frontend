export interface CacheInterface {
  cacheGet<T>(key: string): Promise<T | null>;
  cacheSet<T>(key: string, value: T, ttlSeconds?: number): Promise<boolean>;
  cacheDelete(key: string): Promise<boolean>;
  flushCache?(): Promise<boolean>;
}

export interface CacheError extends Error {
  operation: "get" | "set" | "delete" | "flush";
  key?: string;
  originalError?: unknown;
}

export type CacheResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: CacheError;
    };
