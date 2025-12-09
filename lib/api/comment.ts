"use server";

import { fc } from "@/lib/fetchClient";
import type {
  AllCommentsType,
  ApiResult,
  CommentType,
  IDsNumber,
} from "@/types";

export async function getAllCommentFromPostId(
  postId: number,
): Promise<ApiResult<CommentType[]>> {
  try {
    const data = await fc.get<AllCommentsType>(`comment/post/${postId}/all`);
    return { ok: true, data: data.comments };
  } catch (e) {
    console.error(e);

    return { ok: false, message: "get comments error" };
  }
}

export async function getAllCommentIdFromPostId(
  postId: number,
): Promise<ApiResult<number[]>> {
  try {
    const data = await fc.get<IDsNumber>(`comment/post/${postId}`);

    return { ok: true, data: data.ids };
  } catch (e) {
    console.error(`getAllCommentIdFromPostId: ${e}`);

    return { ok: false, message: "get comment id error" };
  }
}

export async function getCommentFromId(
  commentId: number,
): Promise<ApiResult<CommentType>> {
  try {
    const data = await fc.get<CommentType>(`comment/${commentId}`);

    return { ok: true, data };
  } catch (e) {
    console.error(`getCommentFromId: ${e}`);

    return { ok: false, message: "get comment error" };
  }
}
