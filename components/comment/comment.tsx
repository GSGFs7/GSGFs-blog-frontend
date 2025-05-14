import CommentAvatar from "./avatar";
import CommentAvatarLink from "./avatar-link";
import Button from "./button";
import CommentInput from "./comment-input";
import CommentList from "./comment-list";

import { getSession } from "@/lib/auth";

export default async function Comment({ postId }: { postId: number }) {
  // TODO: need get session on client side
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
          {session ? (
            <CommentAvatarLink type="user">
              <CommentAvatar
                avatar={session?.avatar_url}
                name={session?.name}
              />
            </CommentAvatarLink>
          ) : (
            <CommentAvatarLink type="login">
              <CommentAvatar />
            </CommentAvatarLink>
          )}
          <Button disabled={!session} />
        </div>
      </div>
    </>
  );
}
