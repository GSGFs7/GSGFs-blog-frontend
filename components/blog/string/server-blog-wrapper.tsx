"use server";

import matter from "gray-matter";

import type { Post } from "@/types";
import { markdownToHtml } from "@/utils/markdown";

import BlogBody from "./blog-body";

export default async function BlogBodyString({ post }: { post: Post }) {
  let html = post.content_html;

  if (!html) {
    const { data: _frontmatter, content: markdownContent } = matter(
      post.content,
    ); // this function use DOMParser

    html = await markdownToHtml(markdownContent);
  }

  return <BlogBody html={html} />;
}
