import { Metadata } from "next";
import React, { ReactNode } from "react";

import { getPost } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const post = await getPost((await params).postId);

  if (!post) return {};

  return {
    title: post.title,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
