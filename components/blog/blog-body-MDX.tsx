import "@/styles/blog.css";
import "github-markdown-css/github-markdown-dark.css";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";

import BlogBodyMDXWrap from "./blog-body-MDX-wrap";

import { CustomMDX } from "@/components/MDX";

export default async function BlogBodyMDX({ markdown }: { markdown: string }) {
  return (
    <article
      className="markdown-body rounded-2xl backdrop-blur-lg md:border-2 md:border-gray-500/50 md:p-8"
      data-theme="dark"
    >
      <BlogBodyMDXWrap markdown={markdown}>
        <CustomMDX source={markdown} />
      </BlogBodyMDXWrap>
    </article>
  );
}
