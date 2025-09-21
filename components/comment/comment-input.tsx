"use client";

import bowser from "bowser";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTurnstile } from "react-turnstile";

import { NEXT_PUBLIC_TURNSTILE_SITE_KEY } from "@/env/public";
import { apiAddComment } from "@/server/backend";

import TurnstileWidget from "./turnstile-widget";

export default function CommentInput({
  disabled = false,
  postId,
}: {
  disabled?: boolean;
  postId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstile = useTurnstile();
  const router = useRouter();
  const [userAgent, setUserAgent] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [commentContent, setCommentContent] = useState<string>("");

  const getDraftKey = (postId: number) => `comment-draft-${postId}`;
  const saveDraft = (content: string) => {
    if (typeof window !== "undefined") {
      setCommentContent(content);
      localStorage.setItem(getDraftKey(postId), content);
    }
  };
  const clearDraft = () => {
    if (typeof window !== "undefined") {
      setCommentContent("");
      localStorage.removeItem(getDraftKey(postId));
    }
  };

  // Restore draft
  useEffect(() => {
    // comment draft
    if (typeof window !== "undefined") {
      const saveDraft = localStorage.getItem(getDraftKey(postId));

      if (saveDraft) {
        setCommentContent(saveDraft);
      }
    }

    setUserAgent(window.navigator.userAgent);
  }, [postId]);

  async function handleSubmit(formData: FormData) {
    turnstile.reset();

    if (disabled) return;

    if (!turnstileToken) {
      toast.error("请先通过人机验证");

      return;
    }

    const content = formData.get("content");

    if (String(content).trim().length < 1) {
      toast.error("请输入内容");

      return;
    }

    const res = await apiAddComment(String(content), postId, turnstileToken, {
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

    if (typeof res === "string") {
      toast.error(res);

      return;
    }

    clearDraft();
    formRef.current?.reset();
    router.refresh();
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
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
        className="peer min-h-36 w-full resize-none bg-transparent p-3 focus:outline-0 sm:min-h-48"
        disabled={disabled}
        id="content"
        name="content"
        value={commentContent}
        onChange={(e) => saveDraft(e.target.value)}
      />

      {NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <TurnstileWidget setTokenAction={setTurnstileToken} />
      )}
    </form>
  );
}
