import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import BlogBody from "@/components/blog/server-blog-wrapper";
import { getPost } from "@/lib/api";

const Comment = dynamic(() => import("@/components/comment"));

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId: postIdStr } = await params;

  // check is valid number
  const postId: number = Number(postIdStr);
  if (Number.isNaN(postId)) {
    notFound();
  }

  const res = await getPost(postId);

  // if not found
  if (res.ok === false) {
    if (res.message === "404") {
      notFound();
    } else {
      // TODO
      notFound();
    }
  }

  const post = res.data;

  return (
    <div className="">
      <BlogBody html={post.content_html ?? undefined} markdown={post.content} />
      <Suspense fallback={<div className="spinner-big" />}>
        <Comment postId={Number(postId)} />
      </Suspense>
    </div>
  );
}
