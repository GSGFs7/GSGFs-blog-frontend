import { NextRequest, NextResponse } from "next/server";

export async function middlewareCSP(
  request: NextRequest,
  response?: NextResponse,
) {
  const existingNonce =
    request.headers.get("x-nonce") || request.headers.get("sec-fetch-nonce");
  const nonce =
    existingNonce ?? Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const CSPHeader = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'nonce-${nonce}'${isDev && ` 'unsafe-eval'`} https://challenges.cloudflare.com`,
    "frame-src https://challenges.cloudflare.com",
    `connect-src 'self' https://challenges.cloudflare.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "object-src 'none'",
    "media-src 'self'",
    "child-src 'none'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const finalResponse = response || NextResponse.next();

  finalResponse.headers.set("Content-Security-Policy", CSPHeader);
  finalResponse.headers.set("x-nonce", nonce);

  return finalResponse;
}
