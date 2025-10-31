import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Entertainment",
  description: `Galgame、动画、书籍等娱乐内容`,
  keywords: [],
  alternates: {
    canonical: `${siteConfig.canonicalUrl}/entertainment`,
  },
  robots: {
    index: false, // The content makes no sense
    follow: true,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
