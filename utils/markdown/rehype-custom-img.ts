import type { Element } from "hast";
import { SKIP, visit } from "unist-util-visit";

export default function rehypeCustomImg(
  options = { width: 1080, quality: 90, optimize: true },
) {
  return (tree: any) => {
    const toOptimizedSrc = (src: string) => {
      const encodedSrc = encodeURIComponent(src);
      return `/_next/image?url=${encodedSrc}&w=${options.width}&q=${options.quality}`;
    };

    visit(
      tree,
      "element",
      (node: Element, index: number | undefined, parent: any) => {
        if (node.tagName === "picture") {
          const pictureChildren = node.children.filter(
            (child: any) => child?.type === "element",
          ) as Element[];

          const fallbackImg = pictureChildren.find(
            (child) => child.tagName === "img",
          );
          const originalFallbackSrc =
            fallbackImg?.properties?.src?.toString() || "";

          for (const child of pictureChildren) {
            if (child.tagName === "source") {
              const srcSet =
                child.properties?.srcSet?.toString() ||
                child.properties?.srcset?.toString() ||
                "";

              if (
                options.optimize &&
                srcSet &&
                !srcSet.startsWith("/") &&
                !srcSet.startsWith("/_next/image")
              ) {
                child.properties = child.properties || {};
                child.properties.srcSet = toOptimizedSrc(srcSet);
              }
            }

            if (child.tagName === "img") {
              const src = child.properties?.src?.toString() || "";

              if (
                options.optimize &&
                src &&
                !src.startsWith("/") &&
                !src.startsWith("/_next/image")
              ) {
                child.properties.src = toOptimizedSrc(src);
              }
            }
          }

          const alt = fallbackImg?.properties?.alt?.toString() || "";
          const src = originalFallbackSrc;

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

        if (node.tagName === "source") {
          const srcSet =
            node.properties?.srcSet?.toString() ||
            node.properties?.srcset?.toString() ||
            "";

          if (
            options.optimize &&
            srcSet &&
            !srcSet.startsWith("/") &&
            !srcSet.startsWith("/_next/image")
          ) {
            node.properties = node.properties || {};
            node.properties.srcSet = toOptimizedSrc(srcSet);
          }

          return;
        }

        if (node.tagName !== "img") {
          return;
        }

        const alt = node.properties?.alt?.toString() || "";
        const src = node.properties?.src?.toString() || "";
        const isInsidePicture =
          parent?.type === "element" && parent.tagName === "picture";

        if (
          options.optimize &&
          src &&
          !src.startsWith("/") &&
          !src.startsWith("/_next/image")
        ) {
          node.properties.src = toOptimizedSrc(src);
        }

        if (isInsidePicture) {
          return;
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
      },
    );
  };
}
