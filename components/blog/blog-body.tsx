"use client";

import "@/styles/blog.css";
import "github-markdown-css/github-markdown-dark.css";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";

import { useBlog } from "@/hooks/blog";

export default function BlogBody({
  html,
}: {
  html: string;
  action?: () => {};
  markdown?: string;
}) {
  useBlog(html);

  return (
    <>
      <article
        dangerouslySetInnerHTML={{ __html: html }}
        className="markdown-body rounded-2xl backdrop-blur-lg md:border-2 md:border-gray-500/50 md:p-8"
        data-theme="dark"
      />
    </>
  );
}
