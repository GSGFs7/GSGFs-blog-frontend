import CommentAvatar from "./avatar";

import { getCommentFromId } from "@/lib/api/comment";

export default async function CommentCard({ id }: { id: number }) {
  const comment = await getCommentFromId(id);

  return (
    <div className="flex min-h-16 w-full flex-row">
      <div className="flex flex-[1] items-center justify-center">
        <CommentAvatar col />
      </div>
      {/* 分隔线会随着父容器高度自动延伸 */}
      <div className="w-1 self-stretch bg-gray-700" />
      <div className="flex flex-[9] flex-wrap items-center p-2">
        {comment?.content}
      </div>
    </div>
  );
}
