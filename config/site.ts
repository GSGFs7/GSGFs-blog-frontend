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
      label: "Entertainment",
      href: "/entertainment",
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
      label: "Entertainment",
      href: "/entertainment",
    },
    {
      label: "About",
      href: "/about",
    },
  ] as const,
  entertainmentCategories: [
    {
      title: "Anime",
      description: "动画番剧观看记录与推荐",
      href: "/anime",
      icon: "📺",
    },
    {
      title: "Books",
      description: "读书笔记与书籍推荐",
      href: "/books",
      icon: "📚",
    },
    {
      title: "Galgame",
      description: "Galgame的推荐与评价",
      href: "/galgame",
      icon: "🎮",
    },
  ] as const,
  // Random show a message in Entertainment page
  entertainmentMessage: [
    "突然发现 Entertainment 这个单词好像太长了...",
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
