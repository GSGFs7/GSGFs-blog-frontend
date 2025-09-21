import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import BlogBody from "@/components/blog/server-blog-wrapper";
import { getPost } from "@/lib/api";

const Comment = dynamic(() => import("@/components/comment"));

export default async function Page({
  params,
}: {
  params: Promise<{ postId: number }>;
}) {
  const { postId } = await params;
  const post = await getPost(postId.toString());

  // if not found
  if (post === null) {
    notFound();
  }

  return (
    <div className="">
      <BlogBody html={post.content_html ?? undefined} markdown={post.content} />
      <Suspense fallback={<div className="spinner-big" />}>
        <Comment postId={postId} />
      </Suspense>
    </div>
  );
}
