import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL as SITE_URL } from "@/env/public";
import { image } from "@/utils/image";

export async function metadata(url: string): Promise<Metadata> {
  return {
    title: {
      default: siteConfig.siteName,
      template: `%s - ${siteConfig.siteName}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords.slice(), // TODO
    metadataBase: new URL(SITE_URL),
    authors: {
      url: SITE_URL,
      name: siteConfig.author,
    },
    creator: siteConfig.author,
    generator: "Next.py", // don't care it
    manifest: "/manifest.webmanifest",
    alternates: {}, // multi-language and RSS, temporarily not used
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "zh-Hans",
      siteName: siteConfig.siteName,
      url: url, // TODO
      title: siteConfig.siteName,
      description: siteConfig.description, // TODO
      images: "/favicon.ico", // TODO
    },
    twitter: {
      card: "summary_large_image",
      creator: `@${siteConfig.author}`,
      site: siteConfig.siteName,
      description: siteConfig.description,
      images: "/favicon.ico",
    },
    icons: [
      {
        url: image("/favicon.ico", 16),
        sizes: "16x16",
      },
      {
        url: image("/favicon.ico", 32),
        sizes: "32x32",
      },
      {
        url: image("/favicon.ico", 48),
        sizes: "48x48",
      },
      {
        url: image("/favicon.ico", 64),
        sizes: "64x64",
      },
      {
        url: image("/favicon.ico", 96),
        sizes: "96x96",
      },
      {
        url: image("/favicon.ico", 128),
        sizes: "128x128",
      },
      {
        url: image("/favicon.ico", 256),
        sizes: "256x256",
      },
    ],
  };
}
