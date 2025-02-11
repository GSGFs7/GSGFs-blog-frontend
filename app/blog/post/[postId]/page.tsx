import matter from "gray-matter";
import { notFound } from "next/navigation";

import { postRenderToBackend } from "@/app/actions";
import { BlogBody, BlogHeader } from "@/components/blog";
import { Post, Render } from "@/types/posts";
import { markdownToHtml } from "@/utils";

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

  async function sendToBack() {
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

    await postRenderToBackend(newPost);
  }

  if (!html) {
    // console.log("rerender");
    html = await markdownToHtml(markdownContent);
  }
  // console.log(html);

  return (
    <div className="pt-96">
      <BlogHeader post={post} />
      <BlogBody html={html ?? "some thing error"} />
    </div>
  );
}
