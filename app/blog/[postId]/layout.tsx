import { Metadata } from "next";
import React, { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { getPost } from "@/lib/api";

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
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.meta_description,
      url: `${process.env.SITE_URL}/blog/${post.id}`,
      type: "article",
      images: [
        {
          url: post.cover_image,
          alt: post.title,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
