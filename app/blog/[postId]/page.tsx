import matter from "gray-matter";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { BlogBody } from "@/components/blog";
import { Post, Render } from "@/types/posts";
import { markdownToHtml } from "@/utils";

const Comment = dynamic(() => import("@/components/comment"));

export default async function Page({
  params,
}: {
  params: Promise<{ postId: number }>;
}) {
  const postId = (await params).postId;
  const res = await fetch(`${process.env.BACKEND_URL}/api/post/${postId}`);

  // 如果找不到的话
  if (res.status === 404) {
    notFound();
  }

  const post = (await res.json()) as Post;
  const { data: frontmatter, content: markdownContent } = matter(post.content); // 分离出frontmatter和正文

  let html = post.content_html;

  if (!html) {
    html = await markdownToHtml(markdownContent);
  }

  async function sendToBack(frontmatter: any, html: string) {
    "use server";
    const newPost = {
      author: frontmatter.author ?? null,
      category: frontmatter.category ?? frontmatter.categories ?? null,
      content_html: html ?? null,
      cover_image: frontmatter.cover_image ?? frontmatter.cover ?? null,
      header_image:
        frontmatter.header_image ??
        frontmatter.top_image ??
        frontmatter.top_img ??
        null,
      id: postId,
      meta_description: frontmatter.meta_description ?? null,
      slug: frontmatter.slug ?? frontmatter.url ?? null,
      tags: frontmatter.tags ?? null,
    } as Render;
  }

  return (
    <div className="">
      {/* <BlogHeader post={post} /> */}
      <BlogBody bg={post.header_image} html={html ?? "some thing error"} />
      {/* <Comment postId={postId} /> */}
    </div>
  );
}
