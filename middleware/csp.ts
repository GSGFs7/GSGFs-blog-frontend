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
  const turnstile = "https://challenges.cloudflare.com";
  const gaSrc = "https://*.googletagmanager.com";
  const gaConnect =
    "https://*.google-analytics.com https://*.analytics.google.com";

  const CSPHeader = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'nonce-${nonce}'${isDev && ` 'unsafe-eval'`} ${turnstile} ${gaSrc}`,
    `frame-src ${turnstile}`,
    `connect-src 'self' ${turnstile} ${gaConnect}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: https: ${gaConnect}`,
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
