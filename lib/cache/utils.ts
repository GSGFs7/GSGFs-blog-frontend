import { cacheDelete, cacheGet, cacheSet } from ".";

import { CacheResult } from "@/types/cache";

export async function safeCacheGet<T>(
  key: string,
): Promise<CacheResult<T | null>> {
  try {
    const data = await cacheGet<T>(key);

    return { success: true, data };
  } catch (e) {
    return { success: false, error: e as any };
  }
}

export async function safeCacheSet<T>(
  key: string,
  value: T,
  ttlSeconds?: number,
): Promise<CacheResult<boolean>> {
  try {
    const data = await cacheSet(key, value, ttlSeconds);

    return { success: true, data };
  } catch (e) {
    return { success: false, error: e as any };
  }
}

export async function safeCacheDelete(
  key: string,
): Promise<CacheResult<boolean>> {
  try {
    const data = await cacheDelete(key);

    return { success: true, data };
  } catch (e) {
    return { success: false, error: e as any };
  }
}
