import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Books",
  description: ``,
  keywords: [],
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
