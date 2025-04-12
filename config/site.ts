export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "GSGFs's blog",
  description: "GSGFs's blog.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    // {
    //   label: "Pages",
    //   href: "/pages",
    // },
    {
      label: "Galgame",
      href: "/galgame",
    },
    {
      label: "About",
      href: "/about",
    },
  ] as const,
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    // {
    //   label: "Pages",
    //   href: "/pages",
    // },
    {
      label: "Galgame",
      href: "/galgame",
    },
    {
      label: "About",
      href: "/about",
    },
  ] as const,
  links: {} as const,
  admin: {
    email: "gsgfs@gsgfs.moe",
  } as const,
};
