"use client";

import { useBlog } from "@/hooks/blog";

export default function BlogBodyMDXWrap({
  children,
  markdown,
}: {
  children: React.ReactNode;
  markdown: string;
}) {
  useBlog(markdown);

  return <>{children}</>;
}
