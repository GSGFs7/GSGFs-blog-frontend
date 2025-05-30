"use server";

import { getAllPostIds } from "@/lib/api";

export async function randomPost(): Promise<null | number> {
  const ids = await getAllPostIds();

  if (ids === null) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * ids.length);
  const randomPostId = ids[randomIndex];

  return randomPostId;
}
