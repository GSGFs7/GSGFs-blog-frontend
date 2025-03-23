"use client";

import dynamic from "next/dynamic";

// disable ssr to solve: `ReferenceError: DOMParser is not defined`
const BlogMD = dynamic(() => import("./blog-body-MD"), { ssr: false });

export default function ClientBlogWrapper({ markdown }: { markdown: string }) {
  return (
    <>
      <BlogMD markdown={markdown} />
    </>
  );
}
