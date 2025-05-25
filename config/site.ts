export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  siteName: "GSGFs's blog",
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
  // The link in the homepage button is not the friend link
  links: [
    {
      label: "Github",
      url: "https://github.com/GSGFs7",
    },
    {
      label: "osu!",
      url: "https://osu.ppy.sh/users/36335512",
    },
  ] as const,
  fonts: { sans: [], italic: [], mono: [] } as const, // There is no point in changing it here. you need import it in layout
  author: "GSGFs" as const,
  adminEmail: "admin@gsgfs.moe" as const,
};
