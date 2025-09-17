import { MetadataRoute } from "next";

import { generateSitemap } from "@/utils/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await generateSitemap();
}
