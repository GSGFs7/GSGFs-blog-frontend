import CommentAvatar from "./avatar";
import CommentAvatarLink from "./avatar-link";
import Button from "./button";
import CommentInput from "./comment-input";
import CommentList from "./comment-list";
import CommentProvider from "./provider";

export default async function Comment({ postId }: { postId: number }) {
  return (
    <CommentProvider>
      <div className="my-8 h-0.5 w-full bg-gray-700" />
      <p className="absolute -translate-y-13 text-2xl">Comment</p>

      <CommentList postId={postId} />

      <div className="my-8 rounded-2xl border border-gray-600 bg-[#1a1c25]">
        <CommentInput postId={postId} />
        <div className="flex items-center justify-between border-t border-gray-700">
          <CommentAvatarLink>
            <CommentAvatar />
          </CommentAvatarLink>
          <Button />
        </div>
      </div>
    </CommentProvider>
  );
}
