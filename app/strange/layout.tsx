import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "strange",
  description: "a strange page",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
