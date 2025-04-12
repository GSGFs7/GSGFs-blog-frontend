import { visit, SKIP } from "unist-util-visit";
import { Element } from "hast";

export default function rehypeCustomImg() {
  return (tree: any) => {
    visit(
      tree,
      "element",
      (node: Element, index: number | undefined, parent: any) => {
        if (node.tagName === "img") {
          const alt = node.properties?.alt?.toString() || "";

          const wrapper = {
            type: "element",
            tagName: "div",
            properties: {
              className: ["image-wrapper"],
              dataAlt: alt,
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
