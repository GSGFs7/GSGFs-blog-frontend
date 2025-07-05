import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Entertainment",
  description: `Galgame、动画、书籍等娱乐内容`,
  keywords: [],
  robots: {
    index: false, // The content makes no sense
    follow: true,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
