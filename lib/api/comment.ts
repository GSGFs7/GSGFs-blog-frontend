import { fc } from "@/lib/fetchClient";
import type { commentType, IDsNumber } from "@/types";

export async function getAllCommentIdFromPostId(
  postId: number,
): Promise<number[] | null> {
  try {
    const data = await fc.get<IDsNumber>(`comment/post/${postId}`);

    return data.ids;
  } catch (e) {
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
    console.error(`getCommentFromId: ${e}`);

    return null;
  }
}
