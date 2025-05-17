import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getPost } from "@/lib/api";
import adapter from "@/components/blog/adapter";

const Comment = dynamic(() => import("@/components/comment"));

export default async function Page({
  params,
}: {
  params: Promise<{ postId: number }>;
}) {
  const postId = (await params).postId;
  const post = await getPost(postId.toString());
  const BlogBody = (await adapter()).default;

  // if not found
  if (post === null) {
    notFound();
  }

  return (
    <div className="">
      <BlogBody markdown={post.content} />
      <Suspense fallback={<div className="spinner-big" />}>
        <Comment postId={postId} />
      </Suspense>
    </div>
  );
}
