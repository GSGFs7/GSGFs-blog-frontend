import { createUrl } from "@/utils/url";

interface CallableRoute {
  (): string;
  [key: number | string]: string;
}

type BlogRoutes = CallableRoute & {
  post: (id: number | string) => string;
  tag: (id: number | string) => string;
  category: (id: number | string) => string;
};

// Creating a callable object type
function createBlogRoutes(): BlogRoutes {
  const blogRoute = (() => createUrl(["blog"])) as BlogRoutes;

  blogRoute.post = (id: number | string) => createUrl(["blog", id]);
  blogRoute.tag = (id: number | string) => createUrl(["blog", "tag", id]);
  blogRoute.category = (id: number | string) =>
    createUrl(["blog", "category", id]);

  return blogRoute;
}

// Get routes string
export const routes = {
  home: () => createUrl("/"),
  about: () => createUrl("about"),
  admin: () => createUrl("admin"),
  anime: () => createUrl("anime"),
  blog: createBlogRoutes(),
  books: () => createUrl("books"),
  entertainment: () => createUrl("entertainment"),
  galgame: () => createUrl("galgame"),
  login: () => createUrl("login"),
  pages: () => createUrl("pages"),
  privacy: () => createUrl("privacy"),
  robots: () => createUrl("robots"),
  sitemap: () => createUrl("sitemap"),
  strange: () => createUrl("strange"),
  user: () => createUrl("user"),
};

export function getAllStaticRoutes(routeObject: object = routes): string[] {
  const staticRoutes: string[] = [];

  for (const key in routeObject) {
    if (Object.prototype.hasOwnProperty.call(routeObject, key)) {
      const value = routeObject[key as keyof typeof routeObject];
      if (typeof value === "function") {
        staticRoutes.push((value as () => string)());

        const subRoutes = Object.keys(value);
        for (const subKey of subRoutes) {
          const subValue = value[subKey];
          if (typeof subValue === "function") {
            staticRoutes.push(...getAllStaticRoutes(value));
          }
        }
      }
    }
  }

  return [...new Set(staticRoutes)];
}
