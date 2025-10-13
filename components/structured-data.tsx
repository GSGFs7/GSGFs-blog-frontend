import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";

// https://developers.google.com/search/docs/appearance/structured-data
export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Website",
    name: siteConfig.siteName,
    description: siteConfig.description,
    url: NEXT_PUBLIC_SITE_URL,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: NEXT_PUBLIC_SITE_URL,
    },
    inLanguage: "zh-CN",
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  );
}
