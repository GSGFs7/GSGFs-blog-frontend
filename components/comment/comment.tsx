import { getSession } from "@/lib/auth";

import CommentAvatar from "./avatar";
import CommentAvatarLink from "./avatar-link";
import Button from "./button";
import CommentInput from "./comment-input";
import CommentList from "./comment-list";

export default async function Comment({ postId }: { postId: number }) {
  const session = await getSession();

  return (
    <>
      {/* 与上面内容的分割线 */}
      <div className="my-8 h-0.5 w-full bg-gray-700" />
      <p className="absolute -translate-y-13 text-2xl">Comment</p>
      {/* 评论列表 */}
      <CommentList postId={postId} />
      {/* 评论输入卡片 */}
      <div className="my-8 rounded-2xl border border-gray-600 bg-[#1a1c25]">
        <CommentInput disabled={!session} postId={postId} />
        {/* <CommentMDEditor disabled={!session} postId={postId} /> */}
        <div className="flex items-center justify-between border-t border-gray-700">
          <CommentAvatarLink type={session ? "user" : "login"}>
            <CommentAvatar />
          </CommentAvatarLink>
          <Button disabled={!session} />
        </div>
      </div>
    </>
  );
}
