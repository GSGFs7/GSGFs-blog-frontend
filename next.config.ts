import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: "standalone" as const,
  images: {
    remotePatterns: [
      {
        hostname: "img.gsgfs.moe",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // ["remark-parse"],
      // ["remark-math"],
      // ["remark-gfm"],
      remarkGfm,
      // ["remark-rehype"],
    ],
    rehypePlugins: [
      // ["rehype-katex"],
      // ["rehype-raw"],
      // ["rehype-highlight"],
      // ["rehype-highlight-code-lines"],
    ],
  },
});

export default withMDX(nextConfig);
