import type { Root } from "hast";
import { describe, expect, it } from "vitest";

import rehypeCustomImg from "./rehype-custom-img";

describe("rehypeCustomImg", () => {
  it("wraps pictures and optimizes picture sources", () => {
    const tree: Root = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "picture",
          properties: {},
          children: [
            {
              type: "element",
              tagName: "source",
              properties: {
                srcSet: "https://xxx.com/image/avif/xxx.avif",
                type: "image/avif",
              },
              children: [],
            },
            {
              type: "element",
              tagName: "source",
              properties: {
                srcSet: "https://xxx.com/image/webp/xxx.webp",
                type: "image/webp",
              },
              children: [],
            },
            {
              type: "element",
              tagName: "img",
              properties: {
                src: "https://xxx.com/image/raw/xxx.png",
                alt: "11",
              },
              children: [],
            },
          ],
        },
      ],
    };

    rehypeCustomImg()(tree);

    const wrapper = tree.children[0] as any;
    const picture = wrapper.children[0];

    expect(wrapper.tagName).toBe("span");
    expect(wrapper.properties.className).toEqual(["image-wrapper"]);
    expect(wrapper.properties.dataAlt).toBe("11");
    expect(wrapper.properties.dataSrc).toBe(
      "https://xxx.com/image/raw/xxx.png",
    );
    expect(picture.tagName).toBe("picture");
    expect(picture.children[0].properties.srcSet).toBe(
      "/_next/image?url=https%3A%2F%2Fxxx.com%2Fimage%2Favif%2Fxxx.avif&w=1080&q=90",
    );
    expect(picture.children[1].properties.srcSet).toBe(
      "/_next/image?url=https%3A%2F%2Fxxx.com%2Fimage%2Fwebp%2Fxxx.webp&w=1080&q=90",
    );
    expect(picture.children[2].tagName).toBe("img");
    expect(picture.children[2].properties.src).toBe(
      "/_next/image?url=https%3A%2F%2Fxxx.com%2Fimage%2Fraw%2Fxxx.png&w=1080&q=90",
    );
  });

  it("wraps standalone images", () => {
    const tree: Root = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "p",
          properties: {},
          children: [
            {
              type: "element",
              tagName: "img",
              properties: {
                src: "https://xxx.com/image/raw/standalone.png",
                alt: "cover",
              },
              children: [],
            },
          ],
        },
      ],
    };

    rehypeCustomImg()(tree);

    const paragraph = tree.children[0] as any;
    const wrapper = paragraph.children[0];

    expect(wrapper.tagName).toBe("span");
    expect(wrapper.properties.className).toEqual(["image-wrapper"]);
    expect(wrapper.properties.dataAlt).toBe("cover");
    expect(wrapper.properties.dataSrc).toBe(
      "https://xxx.com/image/raw/standalone.png",
    );
    expect(wrapper.children[0].tagName).toBe("img");
    expect(wrapper.children[0].properties.src).toBe(
      "/_next/image?url=https%3A%2F%2Fxxx.com%2Fimage%2Fraw%2Fstandalone.png&w=1080&q=90",
    );
  });
});
