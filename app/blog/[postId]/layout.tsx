import { Metadata } from "next";
import React, { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";
import { getPost } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const res = await getPost((await params).postId);

  if (!res.ok) return {};

  const post = res.data;

  return {
    // inherit superior template, no site suffix
    title: `${post.title} - ${siteConfig.siteName}`,
    description: post.meta_description || post.title,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.meta_description,
      url: `${NEXT_PUBLIC_SITE_URL}/blog/${post.id}`,
      type: "article",
      images: [
        {
          url:
            post.header_image ??
            post.cover_image ??
            `${NEXT_PUBLIC_SITE_URL}/default-cover.jpg`,
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
