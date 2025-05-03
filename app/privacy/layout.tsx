import { Metadata } from "next";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "隐私协议",
  description: `${siteConfig.name}的隐私政策, 我们如何保护您的隐私.`,
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
