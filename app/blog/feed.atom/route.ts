import { NextRequest } from "next/server";

import { generateBlogFeed } from "@/utils/rss";

export async function GET(_request: NextRequest): Promise<Response> {
  return new Response(await generateBlogFeed(), {
    status: 200,
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, state-while-revalidate=7200",
    },
  });
}
