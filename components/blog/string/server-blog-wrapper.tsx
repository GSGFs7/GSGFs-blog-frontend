"use server";

import matter from "gray-matter";
import dynamic from "next/dynamic";

import { markdownToHtml } from "@/utils/markdown";

const Blog = dynamic(() => import("./blog-body"));

export default async function BlogBodyString({
  markdown,
  html,
}: {
  markdown: string;
  html?: string;
}) {
  if (!html) {
    const { data: _frontmatter, content: markdownContent } = matter(markdown); // this function use DOMParser

    html = await markdownToHtml(markdownContent);
  }

  return <Blog html={html} />;
}
