import "server-only";

import type { CacheResult } from "@/types/cache";

import { cacheDelete, cacheGet, cacheSet } from ".";

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
): Promise<CacheResult<boolean>> {
  try {
    const data = await cacheSet(key, value);

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
