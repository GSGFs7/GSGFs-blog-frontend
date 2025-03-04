import Link from "next/link";

import CommentAvatar from "./avatar";
import Button from "./button";
import CommentInput from "./comment-input";
import CommentList from "./comment-list";

import { getSession } from "@/lib/auth";

export default async function Comment({ postId }: { postId: number }) {
  const session = await getSession();

  return (
    <>
      <div className="my-8 h-0.5 w-full bg-gray-700" />
      <p className="absolute -translate-y-13 text-2xl">Comment</p>
      <CommentList postId={postId} />
      <div className="my-8 rounded-2xl border border-gray-600 bg-[#1a1c25]">
        <CommentInput disabled={!session} postId={postId} />
        <div className="flex items-center justify-between border-t border-gray-700">
          <Link href="/user">
            <CommentAvatar />
          </Link>
          <Button disabled={!session} />
        </div>
      </div>
    </>
  );
}
