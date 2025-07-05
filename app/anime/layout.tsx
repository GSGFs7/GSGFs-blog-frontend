import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Anime",
  description: ``,
  keywords: [],
  robots: {
    index: false, // WIP
    follow: false,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
