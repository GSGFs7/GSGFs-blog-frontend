import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Anime",
  description: ``,
  keywords: [],
  alternates: {
    canonical: `${siteConfig.canonicalUrl}/anime`,
  },
  robots: {
    index: false, // WIP
    follow: false,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
