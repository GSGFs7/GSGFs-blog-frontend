import { NextRequest } from "next/server";

import { NEXT_PUBLIC_CAP_INSTANCE_URL } from "@/env/public";

interface Params {
  params: Promise<{
    slug: string[];
  }>;
}

export const maxDuration = 3; // timeout 3s

export async function POST(request: NextRequest, { params }: Params) {
  if (!NEXT_PUBLIC_CAP_INSTANCE_URL) {
    return Response.json({ error: "No CAP" }, { status: 400 });
  }

  const { slug } = await params;
  const pathname = slug.join("/");
  const proxyURL = new URL(pathname, NEXT_PUBLIC_CAP_INSTANCE_URL);

  // Double gzip encoding
  const skipHeaders = new Set([
    "content-length",
    "accept-encoding", // remove this
    "connection",
    "transfer-encoding",
  ]);

  try {
    const body = await request.text();
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (!skipHeaders.has(key.toLowerCase())) {
        headers.set(key, value);
      }
    });

    if (!headers.has("referer")) {
      headers.set("referer", proxyURL.origin);
    }
    if (!headers.has("origin")) {
      headers.set("origin", proxyURL.origin);
    }

    const proxyRequest = new NextRequest(proxyURL, {
      method: request.method,
      headers: headers,
      body: body,
      duplex: "half", // next.js
    });

    // send request
    const response = await fetch(proxyRequest);

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding"); // remove
    responseHeaders.delete("content-length");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (e) {
    console.debug(e);
    return Response.json({ message: "error" }, { status: 500 });
  }
}
