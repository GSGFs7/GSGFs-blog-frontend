import rehypeHighlight from "rehype-highlight";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { rehypeCustomAttrs } from "./rehype-custom-attrs";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // 解析为AST(抽象语法树)
    .use(remarkMath) // 解析数学公式
    .use(remarkGfm) // Github Flavored Markdown支持 表格，删除线等
    .use(remarkRehype, { allowDangerousHtml: true }) // 将 Markdown AST 转换为 HTML AST
    .use(rehypeRaw) // 允许在 Markdown 中使用 HTML
    .use(rehypeCustomAttrs) // 自定义a标签
    .use(rehypeKatex, { strict: false }) // 数学公式渲染为 HTML
    .use(rehypeHighlight) // 代码语法高亮
    .use(rehypeHighlightCodeLines, { showLineNumbers: true }) // 代码段添加行号
    .use(rehypeStringify) // 将 HTML AST 转换为HTML
    .process(markdown);

  return result.toString();
}
