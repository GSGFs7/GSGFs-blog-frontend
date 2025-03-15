import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
// import remarkToc from "remark-toc";
import { unified } from "unified";

import { rehypeCustomAttrs } from "./rehype-custom-attrs";
// import { RemarkAutoToc } from "./remark-auto-toc";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // 解析为AST(抽象语法树)
    // .use(RemarkAutoToc) // 自动添加目录
    // .use(remarkToc, {
    //   heading: "目录", // 要将文章中替换为目录的部分
    //   tight: true, // 紧凑
    //   maxDepth: 5, // 最大深度
    //   skip: "skip-toc", // 包含此类名的标题将被跳过
    //   parents: ["root"], // 仅在 root 级别查找目录标题
    //   ordered: false, // 使用无序列表
    //   prefix: "", // 为链接添加前缀
    // }) // 添加目录
    .use(remarkMath) // 解析数学公式
    .use(remarkGfm) // Github Flavored Markdown支持 表格，删除线等
    .use(remarkRehype, { allowDangerousHtml: true }) // 将 Markdown AST 转换为 HTML AST
    .use(rehypeRaw) // 允许在 Markdown 中使用 HTML
    .use(rehypeCustomAttrs) // 自定义a标签
    .use(rehypeSlug) // 给标题添加id
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["anchor-link"] },
    }) // 添加锚点链接
    .use(rehypeKatex, { strict: false }) // 数学公式渲染为 HTML
    .use(rehypeHighlight) // 代码语法高亮
    .use(rehypeHighlightCodeLines, { showLineNumbers: true }) // 代码段添加行号
    .use(rehypeStringify) // 将 HTML AST 转换为HTML
    .process(markdown);

  return result.toString();
}
