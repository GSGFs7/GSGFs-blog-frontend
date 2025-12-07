import type { Element } from "hast";
import { visit } from "unist-util-visit";

export function rehypeCustomAttrs() {
  return (tree: any) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "a") {
        const internalLinkPattern =
          /^(data-footnote-backref|user-content-fnref)/;

        // 这个标签的 class
        const className = node.properties?.className as string[] | undefined;
        // 这个标签的 id
        const id = node.properties?.id as string | undefined;

        // 判断是否是内部链接
        const isInternalLink =
          className?.some((cls) => internalLinkPattern.test(cls)) ||
          internalLinkPattern.test(id ?? "");

        // 如果是就重写部分属性
        node.properties = {
          ...node.properties,
          ...(!isInternalLink && {
            target: "_blank",
            rel: "noopener noreferrer",
          }),
        };
      }
    });
  };
}
