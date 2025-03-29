export const runtime = "edge";

// import matter from "gray-matter";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import adapter from "@/components/blog/adapter";
import { getPost } from "@/lib/api";

const Comment = dynamic(() => import("@/components/comment"));

export default async function Page({
  params,
}: {
  params: Promise<{ postId: number }>;
}) {
  const BlogBody = (await adapter()).default;
  const postId = (await params).postId;
  const post = await getPost(postId.toString());

  // 如果找不到的话
  if (post === null) {
    notFound();
  }

  return (
    <div className="">
      {/* <BlogHeader post={post} /> */}
      <BlogBody markdown={post.content} />
      <Suspense fallback={<div className="spinner-big" />}>
        <Comment postId={postId} />
      </Suspense>
    </div>
  );
}
