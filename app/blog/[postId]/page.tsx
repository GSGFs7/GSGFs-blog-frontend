import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getPost } from "@/lib/api";
import BlogBodyMDX from "@/components/blog/blog-body-MDX";

const Comment = dynamic(() => import("@/components/comment"));

export default async function Page({
  params,
}: {
  params: Promise<{ postId: number }>;
}) {
  const postId = (await params).postId;
  const post = await getPost(postId.toString());

  // 如果找不到的话
  if (post === null) {
    notFound();
  }

  return (
    <div className="">
      <BlogBodyMDX markdown={post.content} />
      <Suspense fallback={<div className="spinner-big" />}>
        <Comment postId={postId} />
      </Suspense>
    </div>
  );
}
