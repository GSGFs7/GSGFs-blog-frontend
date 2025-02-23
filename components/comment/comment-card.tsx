import { getCommentFromId } from "@/lib/api/comment";

export default async function CommentCard({ id }: { id: number }) {
  const comment = await getCommentFromId(id);

  return (
    <div className="flex min-h-16 w-full flex-row">
      <div className="flex-[1]"></div>
      {/* 分隔线会随着父容器高度自动延伸 */}
      <div className="w-1 self-stretch bg-gray-700" />
      <div className="flex-[9]">{/* 这里的内容可以自由增长 */}</div>
    </div>
  );
}
