import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/admin",
      },
    ],
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
  };
}
