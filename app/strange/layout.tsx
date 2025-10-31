import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "strange",
  description: "一个奇怪的页面，包含一些奇怪的内容和功能",
  keywords: ["strange", "奇怪", "实验", "功能"],
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${siteConfig.canonicalUrl}/strange`,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
