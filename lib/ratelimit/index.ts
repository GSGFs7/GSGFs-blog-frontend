"use server";

import { cacheGet, cacheSet } from "@/lib/cache";

const WINDOW_DURATION_S = 60; // 1min
const MAX_REQUESTS = 5;

interface RateLimit {
  count: number;
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  const res = await cacheGet<RateLimit>(`ratelimit:ip:${ip}`);

  if (res && res.count >= MAX_REQUESTS) {
    return false;
  }

  await cacheSet<RateLimit>(
    `ratelimit:ip:${ip}`,
    { count: (res?.count || 0) + 1 },
    WINDOW_DURATION_S,
  );

  return true;
}
