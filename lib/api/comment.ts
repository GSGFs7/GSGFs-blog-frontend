import { commentType } from "@/types";

export async function getAllCommentIdFromPostId(
  postId: number,
): Promise<number[] | null> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/comment/post/${postId}`,
      { method: "GET" },
    );
    const data = await res.json();

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
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/comment/${commentId}`,
      { method: "GET" },
    );

    if (res.status === 404) return null;

    const data = (await res.json()) as commentType;

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`getCommentFromId: ${e}`);

    return null;
  }
}
