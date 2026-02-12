import { visit } from "unist-util-visit";

export default function remarkAudio() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        (node.type === "textDirective" /* :audio */ ||
          node.type === "leafDirective" /* ::audio */ ||
          node.type === "containerDirective") /* :::audio::: */ &&
        node.name === "audio"
      ) {
        let data: any;
        if (node.data) {
          data = node.data;
        } else {
          node.data = {};
          data = node.data;
        }
        data.hName = "audio";
        data.hProperties = {
          src: node.attributes?.src,
          controls: true,
          className: "music-placeholder",
        };
      }
    });
  };
}
