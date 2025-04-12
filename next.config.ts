import type { NextConfig } from "next";

import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: "standalone", // for docker
  images: {
    remotePatterns: [
      { hostname: "img.gsgfs.moe" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "a.ppy.sh" },
    ],
    // loader: "custom",
    // loaderFile: "./image-loader.ts",
  },
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  productionBrowserSourceMaps: true, // generate source map in dev environment
  // CSP protection
  // TODO
  async headers() {
    return [];
  },
  async rewrites() {
    return [
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
      },
    ];
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

// do not use in vercel environment
if (process.env.NODE_ENV === "development" && process.env.VERCEL !== "1") {
  import("@opennextjs/cloudflare").then((openNext) =>
    openNext.initOpenNextCloudflareForDev(),
  );
}
