import { Metadata } from "next";
import React, { ReactNode } from "react";

import { getPost } from "@/lib/api";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const post = await getPost((await params).postId);

  if (!post) return {};

  return {
    // inherit superior template, no site suffix
    title: `${post.title} - ${siteConfig.siteName}`,
    description: post.meta_description || post.title,
    openGraph: {
      title: post.title,
      description: post.meta_description,
      type: "article",
      ...(post.cover_image
        ? {
            images: [
              {
                url: post.cover_image,
                alt: post.title,
                width: 1200,
                height: 630,
              },
            ],
          }
        : {}),
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
