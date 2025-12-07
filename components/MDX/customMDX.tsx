import type { Element } from "mdx/types";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

import { rehypeCustomAttrs } from "@/utils/markdown/rehype-custom-attrs";
import rehypeCustomImg from "@/utils/markdown/rehype-custom-img";

import { components } from "./components";
import ErrorComponent from "./error-component";

// `class` to `className`
const rehypeClassToClassName = () => (tree: Element) => {
  // Recursively traverse the tree structure
  function visitNode(node: Element) {
    // Handle attributes of type mdxJsxAttribute (for JSX elements)
    if (node.attributes && Array.isArray(node.attributes)) {
      node.attributes.forEach((attr: Element) => {
        if (attr.type === "mdxJsxAttribute" && attr.name === "class") {
          attr.name = "className";
        }
      });
    }

    // Handle properties for standard HTML elements
    if (node.properties?.class) {
      node.properties.className = node.properties.class;
      delete node.properties.class;
    }

    // Recursively process child nodes
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        visitNode(child);
      }
    }
  }

  visitNode(tree);
};

export function CustomMDX({ source }: { source: string }) {
  // process `<url>` to `[url](url)`
  const processedSource = source.replace(
    /<(http|https):\/\/([^>]+)>/g,
    (_, protocol, url) => `[${protocol}://${url}](${protocol}://${url})`,
  );

  const options: MDXRemoteOptions = {
    mdxOptions: {
      remarkPlugins: [
        remarkParse,
        remarkMath,
        remarkGfm,
        [remarkRehype, { allowDangerousHtml: true }],
      ],
      rehypePlugins: [
        rehypeClassToClassName,
        [rehypeCustomImg, { optimize: false }],
        rehypeCustomAttrs,
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypeKatex, { strict: false }],
        [rehypeHighlight],
        [rehypeHighlightCodeLines, { showLineNumbers: true }],
      ],
      format: "mdx",
    },
    parseFrontmatter: true,
    scope: {},
  };

  return (
    <MDXRemote
      components={components}
      options={options}
      source={processedSource}
      onError={({ error }) => <ErrorComponent error={error} />}
    />
  );
}
