import type { Blog, WithContext } from "schema-dts";

import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";

export default function BlogStructuredData() {
  const schema: WithContext<Blog> = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${NEXT_PUBLIC_SITE_URL}/blog`,
    mainEntityOfPage: `${NEXT_PUBLIC_SITE_URL}/blog`,
    name: siteConfig.siteName,
    description: siteConfig.description,
    // supplemented by blog post page
    // blogPost: [],
    // hasPart: [],
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
