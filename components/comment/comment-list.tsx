import CommentCard from "./comment-card";

import { getAllCommentIdFromPostId } from "@/lib/api";

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
