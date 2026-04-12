import type { Element, ElementContent } from "hast";
import type {
  Alternative,
  Image,
  Node,
  Paragraph,
  PhrasingContent,
  Resource,
  Root,
  Text,
} from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export interface PictureNode extends Node, Alternative, Resource {
  type: "picture";
  title?: string | null;
  data?: {
    hName?: string;
  };
  fallback?: string;
  avif?: string;
  webp?: string;
}

// register as a mdast element
declare module "mdast" {
  interface PhrasingContentMap {
    picture: PictureNode;
  }

  interface RootContentMap {
    picture: PictureNode;
  }
}

function isImage(node: unknown): node is Image {
  return !!node && typeof node === "object" && (node as any).type === "image";
}

function isText(node: unknown): node is Text {
  return !!node && typeof node === "object" && (node as any).type === "text";
}

function buildDerivedUrls(rawUrl: string) {
  const match = rawUrl.match(/^(.*\/image)\/raw\/(.+?)(\.[^./]+)$/);
  if (!match) {
    return null;
  }

  const [, base, pathname, ext] = match;
  const stem = pathname;

  return {
    fallback: rawUrl,
    avif: `${base}/avif/${stem}.avif`,
    webp: `${base}/webp/${stem}.webp`,
    originalExt: ext,
  };
}

/**
 * mark `![...](...){convert}` as myself image set format
 */
export const RemarkImageConvert: Plugin<[], Root> = () => (tree) => {
  visit(tree, "paragraph", (node: Paragraph) => {
    const children = node.children;
    const nextChildren: PhrasingContent[] = [];

    for (let i = 0; i < children.length; i++) {
      const current = children[i];
      const next = children[i + 1];
      if (
        isImage(current) &&
        isText(next) &&
        next.value.startsWith("{convert}")
      ) {
        const derived = buildDerivedUrls(current.url);
        if (!derived) {
          nextChildren.push(current);
          continue;
        }

        const pictureNode: PictureNode = {
          type: "picture",
          url: current.url,
          alt: current.alt || undefined,
          title: current.title,
          data: {
            hName: "picture",
          },
          ...derived,
        };

        nextChildren.push(pictureNode);

        // delete the tailing "{convert}" mark
        const rest = next.value.slice("{convert}".length);
        if (rest.length > 0) {
          nextChildren.push({ type: "text", value: rest });
        }

        i += 1;
        continue;
      }

      nextChildren.push(current);
    }

    node.children = nextChildren;
  });
};

type RehypeHandler = (
  state: unknown,
  node: PictureNode,
  parent?: unknown,
) => Element | ElementContent[] | undefined;

export const ImageConvertHandler: RehypeHandler = (_, pictureNode) => {
  const children: ElementContent[] = [];

  if (pictureNode.avif) {
    children.push({
      type: "element",
      tagName: "source",
      properties: {
        srcSet: pictureNode.avif,
        type: "image/avif",
      },
      children: [],
    });
  }

  if (pictureNode.webp) {
    children.push({
      type: "element",
      tagName: "source",
      properties: {
        srcSet: pictureNode.webp,
        type: "image/webp",
      },
      children: [],
    });
  }

  children.push({
    type: "element",
    tagName: "img",
    properties: {
      src: pictureNode.fallback,
      alt: pictureNode.alt || "",
    },
    children: [],
  });

  return {
    type: "element",
    tagName: "picture",
    properties: {},
    children,
  } satisfies Element;
};
