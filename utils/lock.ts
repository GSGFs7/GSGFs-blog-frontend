"use server";

import { cacheDelete, cacheGet, cacheSet } from "@/lib/cache";

/**
 * mutex lock
 * @param lockName the name the cache key
 * @param fn the function will run
 * @param lockTTLSeconds TTL of the record, default 60s
 * @returns return `T` if success, otherwise will return `null`
 */
export async function withLock<T>(
  lockName: string,
  fn: () => Promise<T>,
  lockTTLSeconds: number = 60,
): Promise<T | null> {
  const lockKey = `lock:${lockName}`;

  try {
    const hasLock = await cacheGet<string>(lockKey);

    if (hasLock) {
      return null;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Get lock state error: ", e);

    return null;
  }

  try {
    await cacheSet(lockKey, "1", lockTTLSeconds);

    return await fn();
  } finally {
    await cacheDelete(lockKey);
  }
}
