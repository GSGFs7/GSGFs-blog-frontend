"use client";

import About from "@/markdown/about.mdx";
import "github-markdown-css/github-markdown-dark.css";
import "@/styles/blog.css";

export default function AboutContent() {
  return (
    <article className="markdown-body about w-full rounded-lg px-6 py-8 shadow-lg">
      <About />
    </article>
  );
}
