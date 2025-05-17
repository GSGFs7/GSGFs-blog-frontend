import { common } from "lowlight";
import { Element } from "mdx/types";
import { MDXRemote, MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

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
    if (node.properties && node.properties.class) {
      node.properties.className = node.properties.class;
      delete node.properties.class;
    }

    // Recursively process child nodes
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: Element) => visitNode(child));
    }
  }

  visitNode(tree);
};

export function CustomMDX({ source }: { source: string }) {
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
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypeKatex, { strict: false }],
        [rehypeHighlight, { languages: { ...common } }],
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
      source={source}
      onError={({ error }) => {
        // eslint-disable-next-line no-console
        console.error(error);

        return <ErrorComponent error={error} />;
      }}
    />
  );
}
