import type { WebSite, WithContext } from "schema-dts";

import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";

// https://developers.google.com/search/docs/appearance/structured-data
export default function StructuredData() {
  const schema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    description: siteConfig.description,
    url: NEXT_PUBLIC_SITE_URL,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: NEXT_PUBLIC_SITE_URL,
    },
    inLanguage: "zh-Hans",
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
