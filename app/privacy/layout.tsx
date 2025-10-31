import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "隐私协议",
  description: `${siteConfig.siteName}的隐私政策, 我们如何保护您的隐私.`,
  keywords: ["隐私政策", "隐私协议", "隐私保护"],
  alternates: {
    canonical: `${siteConfig.canonicalUrl}/privacy`,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
