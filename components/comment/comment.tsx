import { CaptchaProvider } from "@/components/captcha";
import { getCaptcha } from "@/lib/captcha";

import CommentAvatar from "./avatar";
import CommentAvatarLink from "./avatar-link";
import CommentButton from "./button";
import CommentCaptcha from "./captcha";
import CommentInput from "./comment-input";
import CommentList from "./comment-list";
import CommentProvider from "./provider";

export default async function Comment({ postId }: { postId: number }) {
  const captchaType = await getCaptcha();

  return (
    <CaptchaProvider captchaType={captchaType}>
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
            <div className="flex flex-row items-center">
              <CommentCaptcha />
              <div className="mr-3 h-6 w-px bg-gray-500" />
              <CommentButton />
            </div>
          </div>
        </div>
      </CommentProvider>
    </CaptchaProvider>
  );
}
