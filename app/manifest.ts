import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#1a1c25",
    theme_color: "#1a1c25",
    dir: "auto",
    icons: [
      {
        src: "/icon-192x192.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/icon-512x512.webp",
        sizes: "512x512",
        type: "image/webp",
      },
      {
        src: "/favicon.png",
        type: "image/png",
        sizes: "500x500",
      },
    ],
  };
}
