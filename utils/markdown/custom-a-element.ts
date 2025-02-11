import type { Plugin } from "unified";

import { visit } from "unist-util-visit";

export const rehypeCustom: Plugin = () => {
  return (tree) => {
    visit(tree, "element", (node: { tagName: string; properties: any }) => {
      if (node.tagName === "a") {
        // 修改链接的属性
        node.properties = {
          ...node.properties,
          target: "_blank",
          rel: "noopener noreferrer",
        };
      }
    });
  };
};
