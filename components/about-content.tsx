"use client";

import about from "@/markdown/about.mdx";
import "github-markdown-css/github-markdown-dark.css";
import "@/styles/blog.css";
import { markdownToHtml } from "@/utils";

export default function AboutContent() {
  return (
    <article
      dangerouslySetInnerHTML={{ __html: markdownToHtml(about) }}
      className="markdown-body about w-full rounded-lg px-6 py-8"
    />
  );
}
