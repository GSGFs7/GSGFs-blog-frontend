import type { MetadataRoute } from "next";

import { NEXT_PUBLIC_SITE_URL } from "@/env/public";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/user"],
      },
    ],
    sitemap: `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
