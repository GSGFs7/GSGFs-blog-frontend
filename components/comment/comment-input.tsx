"use client";

import bowser from "bowser";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import TurnstileWidget from "./turnstile-widget";

import { apiAddComment } from "@/server";

export default function CommentInput({
  disabled = false,
  postId,
  setVerifyAction,
}: {
  disabled?: boolean;
  postId: number;
  setVerifyAction: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [userAgent, setUserAgent] = useState<string>("");

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
  }, []);

  return (
    <form
      ref={formRef}
      action={async (formData: FormData) => {
        if (disabled) return;

        const content = formData.get("content");

        if (String(content).trim().length < 1) return;

        const res = await apiAddComment(String(content), postId, {
          user_agent: bowser.getParser(userAgent).getUA(),
          browser: bowser.getParser(userAgent).getBrowser().name,
          browser_version: bowser.getParser(userAgent).getBrowserVersion(),
          platform: bowser.getParser(userAgent).getPlatform().type,
          OS: bowser.getParser(userAgent).getOS().name,
        });

        if (res === null) {
          toast.error("评论失败! 不要干坏事哦~");

          return;
        }

        router.refresh();
      }}
      className="group relative"
      // 用于让在同组件下的button可以提交表单
      id="comment-form"
    >
      <label
        // peer 失效, 用 group 代替 修复了记得改回来
        className={`absolute m-3 transition-transform duration-200 ${disabled ? "text-gray-700" : "group-valid:-translate-y-9 group-focus-within:-translate-y-9"}`}
        htmlFor="content"
      >
        {disabled ? "评论前请先登陆" : "留个评论..."}
      </label>
      <textarea
        required
        // peer 失效了!!!
        className="peer min-h-48 w-full resize-none bg-transparent p-3 focus:outline-0"
        disabled={disabled}
        id="content"
        name="content"
      />

      <TurnstileWidget handleVerifyAction={setVerifyAction} />
    </form>
  );
}
