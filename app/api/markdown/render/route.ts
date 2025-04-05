import matter from "gray-matter";
import { NextResponse } from "next/server";
import { z } from "zod";

import { commentMarkdownToHtml, markdownToHtml } from "@/utils/markdown";

const markdownSchema = z.object({
  content: z.string(),
  options: z
    .object({
      allowUnsafe: z.boolean().optional().default(false),
    })
    .optional(),
});

// standardized error structure
function createErrorResponse(status: number, message: string, details?: any) {
  return NextResponse.json(
    {
      // error: {
      // code: status,
      message,
      details: details || undefined,
      // },
    },
    { status },
  );
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return createErrorResponse(400, "invalid JSON body");
    }

    // ===verify schema===
    const result = markdownSchema.safeParse(body);

    if (!result.success) {
      return createErrorResponse(400, "request format verify failed");
    }

    // ===get data===
    const { content, options } = result.data;
    const unsafe = options?.allowUnsafe || request.headers.get("unsafe");
    const contentLength = request.headers.get("content-length");

    // ===limit length===
    if (
      (contentLength && parseInt(contentLength) > 128 * 1024) ||
      content.length > 128 * 1024
    ) {
      return createErrorResponse(413, "content is to long");
    }

    // ===return html===
    try {
      const { data: frontmatter, content: markdownContent } = matter(content);
      const html = unsafe
        ? await commentMarkdownToHtml(markdownContent)
        : await markdownToHtml(markdownContent);

      return NextResponse.json({ frontmatter, html });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      return createErrorResponse(500, "rendering failed");
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("An error occurred while processing the request: ", error);

    return createErrorResponse(
      500,
      "An error occurred while processing the request",
    );
  }
}
