import type { Element } from "hast";
import { SKIP, visit } from "unist-util-visit";

import cloudflareLoader from "@/image-loader";

export default function rehypeCustomImg(
  options = { width: 1080, quality: 90, optimize: true },
) {
  return (tree: any) => {
    visit(
      tree,
      "element",
      (node: Element, index: number | undefined, parent: any) => {
        if (node.tagName === "img") {
          const alt = node.properties?.alt?.toString() || "";
          const src = node.properties?.src?.toString() || "";

          // optimize the image source
          if (options.optimize && src && !src.startsWith("/")) {
            const encodedSrc = encodeURIComponent(src);
            const optimizedSrc = process.env.CF
              ? cloudflareLoader({
                  src: src,
                  width: options.width,
                  quality: options.quality,
                }) // Use Cloudflare image
              : `/_next/image?url=${encodedSrc}&w=${options.width}&q=${options.quality}`;

            node.properties.src = optimizedSrc;
          }

          // add a wrapper to show the alt text
          const wrapper = {
            type: "element",
            tagName: "span",
            properties: {
              className: ["image-wrapper"],
              dataAlt: alt,
              dataSrc: src,
            },
            children: [{ ...node }],
          };

          if (parent && typeof index === "number") {
            parent.children[index] = wrapper;

            return [SKIP];
          }
        }
      },
    );
  };
}
