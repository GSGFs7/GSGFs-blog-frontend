import { join } from "path";
import { readdirSync, statSync } from "fs";

import { getPostSitemap } from "@/lib/api/post";

export interface SitemapField {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

function getRoutes(dir: string, baseRoute: string = ""): string[] {
  const routes: string[] = [];
  const items: string[] = readdirSync(dir);

  for (const item of items) {
    if (
      item.startsWith("_") ||
      item.startsWith(".") ||
      item.startsWith("[") ||
      item === "api"
    ) {
      continue;
    }

    const path = join(dir, item);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      // 如果是路由分组, 就不需要添加到路径
      const subRoute = item.startsWith("(") ? "" : `/${item}`;

      // 递归查找
      routes.push(...getRoutes(path, baseRoute + subRoute));
    } else if (
      item === "page.tsx" ||
      item === "page.ts" ||
      item === "page.js"
    ) {
      routes.push(baseRoute);
    }
  }

  return [...new Set(routes)];
}

export async function generateSitemap(): Promise<SitemapField[]> {
  "use server";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const appDir = join(process.cwd(), "app");
  const postIds = await getPostSitemap();

  const routes = getRoutes(appDir)
    .filter((route) => route !== "") // 移除跟路由
    .map(
      (route) =>
        ({
          // 要用括号括起来, 不然是 undefined
          url: `${baseUrl}${route}`,
          changeFrequency: "weekly",
          priority: 0.7,
        }) as SitemapField,
    );

  const postRoutes =
    postIds?.map(
      ({ id, update_at }) =>
        ({
          url: `${baseUrl}/blog/${id}`,
          changeFrequency: "weekly",
          lastModified: `${update_at}`,
          priority: 0.8,
        }) as SitemapField,
    ) ?? [];

  const fields: SitemapField[] = [
    { url: `${baseUrl}`, changeFrequency: "monthly", priority: 1.0 },
    ...routes,
    ...postRoutes,
  ];

  // return `<?xml version="1.0" encoding="UTF-8"?>
  //   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  // ${fields
  //   .map(
  //     (field) =>
  //       `<url>
  //         <loc>${field.url}</loc>
  //         ${field.lastModified ? `<lastmod>${field.lastModified}</lastmod>` : ""}
  //         ${field.changeFrequency ? `<changefreq>${field.changeFrequency}</changefreq>` : ""}
  //         ${field.priority ? `<priority>${field.priority}</priority>` : ""}
  //       </url>`,
  //   )
  //   .join("")}
  //   </urlset>`;

  return fields;
}
