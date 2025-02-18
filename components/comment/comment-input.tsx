"use client";

import { useRef } from "react";

import { apiAddComment } from "@/server";

export default function CommentInput({
  disabled = false,
  postId,
}: {
  disabled?: boolean;
  postId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData: FormData) => {
        if (disabled) return;

        const content = formData.get("content");

        if (!content) return;

        await apiAddComment(String(content), postId);
      }}
      className="group relative"
      // 用于让在同目录下的button可以提交表单
      id="comment-form"
    >
      <label
        // peer 失效 用 group 代替
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
    </form>
  );
}
