"use server";

import { getAllPostIds } from "@/lib/api";

/**
 * Fetch a random blog post ID.
 * @returns A random post ID from the list of all post IDs, or null if the list is empty or an error occurs.
 */
export async function randomPost(): Promise<null | number> {
  const ids = await getAllPostIds();

  if (ids === null) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * ids.length);
  const randomPostId = ids[randomIndex];

  return randomPostId;
}
