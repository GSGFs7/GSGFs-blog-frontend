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
  let processedSource = source;

  // process `<url>` to `[url](url)`
  processedSource = processedSource.replace(
    /<(http|https):\/\/([^>]+)>/g,
    (_, protocol, url) => `[${protocol}://${url}](${protocol}://${url})`,
  );

  // it's a stupid way to fix it
  const validHtmlTags = [
    "div",
    "span",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "code",
    "pre",
    "blockquote",
    "table",
    "tr",
    "td",
    "th",
    "strong",
    "em",
    "br",
    "hr",
  ];

  const validTagsPattern = new RegExp(
    `<\\/?(?:${validHtmlTags.join("|")})(?:\\s[^>]*)?(?:>|\\/>)`,
    "g",
  );

  const placeholders: string[] = [];

  processedSource = processedSource.replace(validTagsPattern, (match) => {
    placeholders.push(match);

    return `__VALID_TAG_${placeholders.length - 1}__`;
  });

  processedSource = processedSource.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  processedSource = processedSource.replace(
    /__VALID_TAG_(\d+)__/g,
    (_, index) => {
      return placeholders[parseInt(index)];
    },
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
      source={processedSource}
      onError={({ error }) => <ErrorComponent error={error} />}
    />
  );
}
