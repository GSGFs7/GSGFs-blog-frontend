export interface CacheInterface {
  cacheGet<T>(key: string): Promise<T | null>;
  cacheSet<T>(key: string, value: T, ttlSeconds?: number): Promise<boolean>;
  cacheDelete(key: string): Promise<boolean>;
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
