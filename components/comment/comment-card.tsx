import CommentAvatar from "./avatar";

import { getCommentFromId } from "@/lib/api";

export default async function CommentCard({ id }: { id: number }) {
  const comment = await getCommentFromId(id);

  return (
    <div className="flex min-h-16 w-full flex-row">
      <div className="flex flex-[1] items-center justify-center">
        <CommentAvatar
          col
          avatar={comment?.avatar}
          name={comment?.guest_name}
        />
      </div>
      {/* 分隔线会随着父容器高度自动延伸 */}
      <div className="my-1 w-1 self-stretch bg-gray-700" />
      <div className="relative flex w-full flex-[9] flex-wrap items-center p-2">
        <span className="py-4">{comment?.content}</span>
        <span className="absolute top-0 right-0">
          {comment ? new Date(comment.created_at).toLocaleString() : ""}
        </span>
      </div>
    </div>
  );
}
