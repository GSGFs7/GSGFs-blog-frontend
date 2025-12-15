import matter from "gray-matter";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { commentMarkdownToHtml, markdownToHtml } from "@/utils/markdown";

const markdownSchema = z.object({
  content: z.string(),
  options: z
    .object({
      allowUnsafe: z.boolean().optional(),
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

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return createErrorResponse(400, "Invalid JSON body");
    }

    // ===verify schema===
    const result = markdownSchema.safeParse(body);

    if (!result.success) {
      return createErrorResponse(400, "Request format verification failed");
    }

    // ===get data===
    const { content, options } = result.data;
    const allowUnsafe =
      options?.allowUnsafe ||
      request.headers.get("allow-unsafe")?.toLowerCase() === "true";
    const contentLength = request.headers.get("content-length");

    // ===limit length===
    if (
      (contentLength && parseInt(contentLength, 10) > 128 * 1024) ||
      content.length > 128 * 1024
    ) {
      return createErrorResponse(413, "Content is too long");
    }

    // ===return html===
    try {
      const { data: frontmatter, content: markdownContent } = matter(content);
      const html = allowUnsafe
        ? await markdownToHtml(markdownContent)
        : await commentMarkdownToHtml(markdownContent);

      return NextResponse.json({ frontmatter, html });
    } catch (error) {
      console.error(error);

      return createErrorResponse(500, "Rendering failed");
    }
  } catch (error) {
    console.error("An error occurred while processing the request: ", error);

    return createErrorResponse(
      500,
      "An error occurred while processing the request",
    );
  }
}
