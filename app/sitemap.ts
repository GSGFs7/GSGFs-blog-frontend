import { MetadataRoute } from "next";

import { generateSitemap } from "@/utils/sitemap";

// Console error: 404 in /sitemap.xml?_rsc=1ld0r:1:0 (rsc -> React Server Component)
// need a static sitemap file
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await generateSitemap();
}
