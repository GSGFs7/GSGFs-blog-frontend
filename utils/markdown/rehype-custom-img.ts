import { visit, SKIP } from "unist-util-visit";
import { Element } from "hast";

export default function rehypeCustomImg(
  options = { width: 1080, quality: 90 },
) {
  return (tree: any) => {
    visit(
      tree,
      "element",
      (node: Element, index: number | undefined, parent: any) => {
        if (node.tagName === "img") {
          const alt = node.properties?.alt?.toString() || "";
          const src = node.properties?.src?.toString() || "";

          if (src && !src.startsWith("/")) {
            const encodedSrc = encodeURIComponent(src);
            const optimizedSrc = `/_next/image?url=${encodedSrc}&w=${options.width}&q=${options.quality}`;

            node.properties.src = optimizedSrc;
          }

          const wrapper = {
            type: "element",
            tagName: "div",
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
