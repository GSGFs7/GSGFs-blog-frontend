"use client";

import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import "@/styles/blog.css";
import "github-markdown-css";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";

export default function BlogBodyMD({ markdown }: { markdown: string }) {
  return (
    <article className="markdown-body rounded-2xl border border-gray-500/50 bg-black/10 p-8 shadow-lg shadow-slate-500/80">
      <Markdown
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath]}
      >
        {markdown}
      </Markdown>
    </article>
  );
}
