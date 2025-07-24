"use server";

import matter from "gray-matter";
import dynamic from "next/dynamic";

import { markdownToHtml } from "@/utils";

const Blog = dynamic(() => import("./blog-body"));

export default async function ClientBlogWrapper({
  markdown,
  html,
}: {
  markdown: string;
  html?: string;
}) {
  if (!html) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: frontmatter, content: markdownContent } = matter(markdown); // this function use DOMParser

    html = await markdownToHtml(markdownContent);
  }

  return (
    <>
      <Blog html={html} />
    </>
  );
}
