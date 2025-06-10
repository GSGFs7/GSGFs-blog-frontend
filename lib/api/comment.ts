import { fc } from "../fetchClient";

import { commentType } from "@/types";

export async function getAllCommentIdFromPostId(
  postId: number,
): Promise<number[] | null> {
  try {
    const data = await fc.get<{ ids: number[] }>(`comment/post/${postId}`);

    return data.ids;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`getAllCommentIdFromPostId: ${e}`);

    return null;
  }
}

export async function getCommentFromId(
  commentId: number,
): Promise<commentType | null> {
  try {
    const data = await fc.get<commentType>(`comment/${commentId}`);

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`getCommentFromId: ${e}`);

    return null;
  }
}
