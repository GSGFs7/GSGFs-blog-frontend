import remarkParse from "remark-parse";
import { unified } from "unified";
import { describe, expect, it } from "vitest";

import { RemarkImageConvert } from "./remark-image-convert";

describe("RemarkImageConvert", () => {
  it("converts an image followed by {convert} into a picture node", () => {
    const tree = unified()
      .use(remarkParse)
      .use(RemarkImageConvert)
      .parse("![cover](/image/raw/demo.png){convert} after convert");

    const transformedTree = unified()
      .use(RemarkImageConvert)
      .runSync(tree) as any;

    const paragraph = transformedTree.children[0];
    expect(paragraph.type).toBe("paragraph");
    expect(paragraph.children).toHaveLength(2);
    expect(paragraph.children?.[0]).toEqual({
      type: "picture",
      url: "/image/raw/demo.png",
      alt: "cover",
      title: null,
      data: {
        hName: "picture",
      },
      fallback: "/image/raw/demo.png",
      avif: "/image/avif/demo.avif",
      webp: "/image/webp/demo.webp",
      originalExt: ".png",
    });
    expect(paragraph.children?.[1]).toEqual({
      type: "text",
      value: " after convert",
    });
  });

  it("keeps the original image when the url does not match the convert rule", () => {
    const tree = unified()
      .use(remarkParse)
      .use(RemarkImageConvert)
      .parse("![cover](/posts/demo.png){convert}");

    const transformedTree = unified()
      .use(RemarkImageConvert)
      .runSync(tree) as any;

    const paragraph = transformedTree.children[0];
    expect(paragraph.type).toBe("paragraph");
    expect(paragraph.children).toHaveLength(2);
    expect(paragraph.children?.[0]).toMatchObject({
      type: "image",
      title: null,
      url: "/posts/demo.png",
      alt: "cover",
    });
    expect(paragraph.children?.[1]).toMatchObject({
      type: "text",
      value: "{convert}",
    });
  });
});

// console.log(
//   await markdownToHtml(
//     "![text](https://localhost:3000/image/raw/xxx.png){convert}",
//   ),
// );
