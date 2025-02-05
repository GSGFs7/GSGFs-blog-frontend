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
    //   label: "Galgame",
    //   href: "/galgame",
    // },
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
    //   label: "Galgame",
    //   href: "galgame",
    // },
    {
      label: "About",
      href: "/about",
    },
  ] as const,
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  } as const,
  admin: {
    email: "gsgfs@gsgfs.moe",
  },
};
