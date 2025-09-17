import { readdirSync, statSync } from "fs";
import { join } from "path";

import { getPostSitemap } from "@/lib/api/post";
import { getAllStaticRoutes } from "@/lib/routes";

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

// Deprecated
function _getRoutes(dir: string, baseRoute: string = ""): string[] {
  const routes: string[] = [];
  // couldflare worker: [unenv] fs.readdirSync is not implemented yet!
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
      routes.push(..._getRoutes(path, baseRoute + subRoute));
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
  // const appDir = join(process.cwd(), "app");
  const postIds = await getPostSitemap();

  const staticRoutes = getAllStaticRoutes()
    .filter((route) => route !== "/") // remove the root route
    .map(
      (route) =>
        ({
          url: `${baseUrl}${route}`,
          changeFrequency: "weekly",
          priority: 0.7,
        }) as SitemapField,
    );

  const postRoutes =
    postIds?.map(
      ({ id, updated_at }) =>
        ({
          url: `${baseUrl}/blog/${id}`,
          changeFrequency: "weekly",
          lastModified: `${updated_at}`,
          priority: 0.8,
        }) as SitemapField,
    ) ?? [];

  const fields: SitemapField[] = [
    { url: `${baseUrl}`, changeFrequency: "monthly", priority: 1.0 },
    ...staticRoutes,
    ...postRoutes,
  ];

  return fields;
}
