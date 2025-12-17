import "server-only";

import type { CacheResult } from "@/types/cache";

import cloudflareKVCache from "./cloudflare-KV";
import momentoHttpCache from "./momento-http";

export async function cacheGet<T>(key: string): Promise<T | null> {
  if (process.env.CF) {
    return await cloudflareKVCache.cacheGet(key);
  } else {
    return await momentoHttpCache.cacheGet(key);
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds?: number,
): Promise<boolean> {
  if (process.env.CF) {
    return await cloudflareKVCache.cacheSet(
      key,
      JSON.stringify(value),
      ttlSeconds,
    );
  } else {
    return await momentoHttpCache.cacheSet(
      key,
      JSON.stringify(value),
      ttlSeconds,
    );
  }
}

export async function cacheDelete(key: string): Promise<boolean> {
  if (process.env.CF) {
    return await cloudflareKVCache.cacheDelete(key);
  } else {
    return await momentoHttpCache.cacheDelete(key);
  }
}

// caught version

export async function cacheGetSafe<T>(
  key: string,
): Promise<CacheResult<T | null>> {
  try {
    const data = await cacheGet<T>(key);

    return { success: true, data };
  } catch (e) {
    return { success: false, error: e as any };
  }
}

export async function cacheSetSafe<T>(
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

export async function cacheDeleteSafe(
  key: string,
): Promise<CacheResult<boolean>> {
  try {
    const data = await cacheDelete(key);

    return { success: true, data };
  } catch (e) {
    return { success: false, error: e as any };
  }
}

export * from "./core";
