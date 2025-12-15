import type { BlogPosting, WithContext } from "schema-dts";

import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";
import type { Post } from "@/types";

export default function BlogPostStructuredData({ post }: { post: Post }) {
  const schema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description,
    image: post.cover_image || undefined,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: NEXT_PUBLIC_SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: NEXT_PUBLIC_SITE_URL,
    },
    datePublished: new Date(post.created_at).toISOString(),
    dateModified: new Date(post.content_update_at).toISOString(),
    inLanguage: "zh-Hans",
    keywords: post.keywords || "",
    mainEntityOfPage: {
      "@type": "Blog",
      "@id": `${NEXT_PUBLIC_SITE_URL}/blog/${post.id}`,
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
    copyrightHolder: {
      "@type": "Person",
      name: siteConfig.author,
      url: NEXT_PUBLIC_SITE_URL,
    },
    copyrightYear: new Date(post.created_at).getFullYear(),
    isPartOf: {
      "@type": "Blog",
      "@id": `${NEXT_PUBLIC_SITE_URL}/blog`,
      name: siteConfig.siteName,
    },
  };

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}
