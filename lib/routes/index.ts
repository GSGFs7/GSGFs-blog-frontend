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
  blog: createBlogRoutes(),
  about: () => createUrl("about"),
  entertainment: () => createUrl("entertainment"),
  anime: () => createUrl("anime"),
  books: () => createUrl("books"),
  galgame: () => createUrl("galgame"),
  privacy: () => createUrl("privacy"),
  strange: () => createUrl("strange"),
};
