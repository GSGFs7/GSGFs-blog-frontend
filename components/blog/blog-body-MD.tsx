"use client";

import "@/styles/blog.css";
import "github-markdown-css";
import matter from "gray-matter";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { useBlog } from "@/hooks/blog";

export default function BlogBodyMD({ markdown }: { markdown: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: frontmatter, content: markdownContent } = matter(markdown); // 分离出frontmatter和正文

  useBlog(markdownContent);

  return (
    <article className="markdown-body wysiwyg rounded-2xl backdrop-blur-lg md:border-2 md:border-gray-500/50 md:p-8">
      <Markdown
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath]}
      >
        {markdownContent}
      </Markdown>
    </article>
  );
}
