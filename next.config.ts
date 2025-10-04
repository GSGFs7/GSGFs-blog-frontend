import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";
import withSerwistInit from "@serwist/next";

import { privateSchema, publicSchema } from "@/env/schema";

// env validation
privateSchema.parse(process.env);
publicSchema.parse(process.env);

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: "standalone", // for docker
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@/components", "react-hot-toast", "react-icons"],
  },
  images: {
    remotePatterns: [
      { hostname: "img.gsgfs.moe" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "a.ppy.sh" },
    ],
    qualities: [60, 75, 90],
    // use Cloudflare Image
    loader: process.env.CF ? "custom" : "default",
    loaderFile: process.env.CF ? "./image-loader.ts" : undefined,
  },
  turbopack: {
    resolveExtensions: [
      ".md",
      ".mdx",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".json",
    ],
    rules: {
      "**/*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  // Source maps are disabled in production to prevent exposing code in the browser.
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
      },
      {
        source: "/blog/feed",
        destination: "/blog/feed.atom",
      },
      {
        source: "/blog/rss",
        destination: "/blog/feed.atom",
      },
      {
        source: "/blog/feed.xml",
        destination: "/blog/feed.atom",
      },
      {
        source: "/blog/rss.xml",
        destination: "/blog/feed.atom",
      },
      {
        source: "/blog/rss.atom",
        destination: "/blog/feed.atom",
      },
      {
        source: "/blog/feed.atom",
        destination: "/blog/feed.atom",
      },
      {
        source: "/img/:path*",
        destination:
          "/_next/image?url=https://img.gsgfs.moe/img/:path*&w=1920&q=90",
      },
    ];
  },
};

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withSerwist(nextConfig));

// open next in dev env
// if (process.env.NODE_ENV === "development") {
//   import("@opennextjs/cloudflare").then((openNext) =>
//     openNext.initOpenNextCloudflareForDev(),
//   );
// }
