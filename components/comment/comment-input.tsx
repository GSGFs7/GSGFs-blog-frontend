"use client";

import bowser from "bowser";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTurnstile } from "react-turnstile";

import { useAuth, useLoading } from "@/app/providers";
import { apiAddComment } from "@/server/backend";

import TurnstileWidget from "./turnstile-widget";

export default function CommentInput({ postId }: { postId: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstile = useTurnstile();
  const router = useRouter();
  const { session } = useAuth();
  const { setIsLoading } = useLoading();
  const isDisabled = !session;
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

    if (isDisabled) return;

    if (!turnstileToken) {
      toast.error("请先通过人机验证");

      return;
    }

    const content = formData.get("content");
    if (String(content).trim().length < 1) {
      toast.error("请输入内容");

      return;
    }
    if (String(content).trim().length > 5000) {
      toast.error("内容过长");

      return;
    }

    const parser = bowser.getParser(userAgent);
    const res = await apiAddComment(String(content), postId, turnstileToken, {
      user_agent: parser.getUA(),
      browser: parser.getBrowser().name,
      browser_version: parser.getBrowserVersion(),
      platform: parser.getPlatform().type,
      OS: parser.getOS().name,
    });

    if (res.ok === false) {
      toast.error(res.message);
      return;
    }

    clearDraft();
    formRef.current?.reset();
    setIsLoading(true);
    router.refresh();
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="group relative"
      id="comment-form"
    >
      <textarea
        required
        className="peer min-h-36 w-full resize-none bg-transparent p-3 focus:outline-0 sm:min-h-48"
        disabled={isDisabled}
        id="content"
        name="content"
        value={commentContent}
        onChange={(e) => saveDraft(e.target.value)}
      />
      <label
        className={clsx(
          `pointer-events-none absolute top-3 left-3 transform transition-transform duration-200 select-none`,
          isDisabled
            ? "text-gray-700"
            : "peer-valid:-translate-y-10 peer-focus:-translate-y-10",
        )}
        htmlFor="content"
      >
        {isDisabled ? "评论前请先登陆" : "留个评论..."}
      </label>

      <TurnstileWidget setTokenAction={setTurnstileToken} />
    </form>
  );
}
