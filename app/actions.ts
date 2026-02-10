"use server";

import { getAllPostIds } from "@/lib/api-client";
import { cacheGet, cacheSet } from "@/lib/cache";

/**
 * Fetch a random blog post ID.
 * @returns A random post ID from the list of all post IDs, or null if the list is empty or an error occurs.
 */
export async function randomPost(): Promise<null | number> {
  const res = await getAllPostIds();

  if (!res.ok) {
    return null;
  }

  const ids = res.data;
  const randomIndex = Math.floor(Math.random() * ids.length);

  return ids[randomIndex];
}

export async function testCache(): Promise<string | null> {
  try {
    await cacheSet("114514", "114514");

    return await cacheGet<string>("114514");
  } catch (e) {
    console.error(e);

    return `${e}`;
  }
}
