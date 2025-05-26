import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "strange",
  description: "一个奇怪的页面，包含一些奇怪的内容和功能",
  keywords: ["strange", "奇怪", "实验", "功能"],
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
