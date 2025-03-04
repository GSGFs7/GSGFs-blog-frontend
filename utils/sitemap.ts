import { join } from "path";
import { readdirSync, statSync } from "fs";

import { getPostSitemap } from "@/lib/api/post";

interface SitemapField {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
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

export async function generateSitemap() {
  "use server";

  const baseUrl = process.env.SITE_URL;
  const appDir = join(process.cwd(), "app");
  const postIds = await getPostSitemap();

  const routes = getRoutes(appDir)
    .filter((route) => route !== "") // 移除跟路由
    .map((route) => ({
      // 要用括号括起来, 不然是 undefined
      url: `${baseUrl}${route}`,
      changefreq: "weekly",
      priority: "0.7",
    }));

  const postRoutes =
    postIds?.map(({ id, update_at }) => ({
      url: `${baseUrl}/blog/${id}`,
      changefreq: "weekly",
      lastmod: `${update_at}`,
      priority: "0.8",
    })) ?? [];

  const fields: SitemapField[] = [
    { url: `${baseUrl}`, changefreq: "monthly", priority: "1.0" },
    ...routes,
    ...postRoutes,
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${fields
    .map(
      (field) =>
        `<url>
          <loc>${field.url}</loc>
          ${field.lastmod ? `<lastmod>${field.lastmod}</lastmod>` : ""}
          ${field.changefreq ? `<changefreq>${field.changefreq}</changefreq>` : ""}
          ${field.priority ? `<priority>${field.priority}</priority>` : ""}
        </url>`,
    )
    .join("")}
    </urlset>`;
}
