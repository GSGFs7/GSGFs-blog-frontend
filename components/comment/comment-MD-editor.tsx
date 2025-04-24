"use client";

import MDEditor from "@uiw/react-md-editor";
import bowser from "bowser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";

import { apiAddComment } from "@/server/backend";

export default function CommentMDEditor({
  disabled,
  postId,
}: {
  disabled: boolean;
  postId: number;
}) {
  const [content, setContent] = useState<string | undefined>("");
  const router = useRouter();
  const [userAgent, setUserAgent] = useState<string>("");

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
  }, []);

  return (
    <form
      action={async (formData: FormData) => {
        if (disabled) return;

        const content = formData.get("content");

        if (!content) return;

        //! fix here: no token provide
        await apiAddComment(String(content), postId, "", {
          user_agent: bowser.getParser(userAgent).getUA(),
          browser: bowser.getParser(userAgent).getBrowser().name,
          browser_version: bowser.getParser(userAgent).getBrowserVersion(),
          platform: bowser.getParser(userAgent).getPlatform().type,
          OS: bowser.getParser(userAgent).getOS().name,
        });

        router.refresh();
      }}
      className="group relative"
      // 用于让在同组件下的button可以提交表单
      id="comment-form"
    >
      <div className="flex h-12 items-center justify-between">
        <span className="ml-3 w-full">评论</span>
      </div>
      <MDEditor
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        value={content}
        onChange={setContent}
      />
    </form>
  );
}
