import { getAllCommentFromPostId } from "@/lib/api";

import CommentCard from "./comment-card";

export default async function CommentList({ postId }: { postId: number }) {
  const res = await getAllCommentFromPostId(postId);
  if (!res.ok) {
    return null;
  }

  return (
    <>
      {res.data.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </>
  );
}
