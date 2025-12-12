"use client";

import { useRef } from "react";

import { useBlog } from "@/hooks/blog";

export default function BlogClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useBlog("", ref);

  return (
    <article
      ref={ref}
      className="markdown-body rounded-2xl backdrop-blur-lg md:border-2 md:border-gray-500/50 md:p-8"
      data-theme="dark"
    >
      {children}
    </article>
  );
}
