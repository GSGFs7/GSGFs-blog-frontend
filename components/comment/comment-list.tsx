import { getAllCommentIdFromPostId } from "@/lib/api";

import CommentCard from "./comment-card";

export default async function CommentList({ postId }: { postId: number }) {
  const ids = await getAllCommentIdFromPostId(postId);

  if (!ids) return null;

  return (
    <>
      {ids.map((id) => (
        <CommentCard key={id} id={id} />
      ))}
    </>
  );
}
