"use server";

import matter from "gray-matter";
import dynamic from "next/dynamic";

import { markdownToHtml } from "@/utils";

const Blog = dynamic(() => import("./blog-body"));

export default async function ClientBlogWrapper({
  markdown,
}: {
  markdown: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: frontmatter, content: markdownContent } = matter(markdown); // this function use DOMParser

  const html = await markdownToHtml(markdownContent);

  // async function sendToBack(frontmatter: any, html: string) {
  //   "use server";
  //   const newPost = {
  //     author: frontmatter.author ?? null,
  //     category: frontmatter.category ?? frontmatter.categories ?? null,
  //     content_html: html ?? null,
  //     cover_image: frontmatter.cover_image ?? frontmatter.cover ?? null,
  //     header_image:
  //       frontmatter.header_image ??
  //       frontmatter.top_image ??
  //       frontmatter.top_img ??
  //       null,
  //     id: postId,
  //     meta_description: frontmatter.meta_description ?? null,
  //     slug: frontmatter.slug ?? frontmatter.url ?? null,
  //     tags: frontmatter.tags ?? null,
  //   } as Render;
  // }

  return (
    <>
      <Blog html={html ?? "some thing error"} />
    </>
  );
}
