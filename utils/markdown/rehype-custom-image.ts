import { Element } from "mdx/types";
import { visit } from "unist-util-visit";

export function RehypeCustomImage() {
  return (tree: any) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img") {
        node.properties = {
          ...(node.properties = {
            ...node.properties,
            loading: "lazy",
            decoding: "async",
            classname: "my-4",
          }),
        };
        console.log(node);
      }
    });
  };
}
