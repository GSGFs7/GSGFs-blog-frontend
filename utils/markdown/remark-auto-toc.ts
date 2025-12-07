import { visit } from "unist-util-visit";

export function RemarkAutoToc() {
  return (tree: any) => {
    let h1Index = -1;
    let h1Found = false;

    visit(tree, "heading", (node, index) => {
      if (!h1Found && node.depth === 1) {
        h1Found = true;
        h1Index = index!;

        return false;
      }
    });

    if (h1Found && h1Index !== -1) {
      const tocHeading = {
        type: "heading",
        depth: 2,
        children: [{ type: "text", value: "目录" }],
        data: {
          hProperties: {
            className: "toc-heading",
            id: "auto-toc",
          },
        },
      };

      tree.children.splice(h1Index + 1, 0, tocHeading);
    }
  };
}
