import { MetadataRoute } from "next";

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
    host: `${NEXT_PUBLIC_SITE_URL}`,
    sitemap: `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
