import { Metadata } from "next";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "隐私协议",
  description: `${siteConfig.siteName}的隐私政策, 我们如何保护您的隐私.`,
  keywords: ["隐私政策", "隐私协议", "隐私保护"],
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
