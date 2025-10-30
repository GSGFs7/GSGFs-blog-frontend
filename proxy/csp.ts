import { NextRequest, NextResponse } from "next/server";

export async function middlewareCSP(
  request: NextRequest,
  response?: NextResponse,
) {
  // Abandoning nonce, too many errors
  const isDev = process.env.NODE_ENV === "development";

  const turnstileSrc = "https://challenges.cloudflare.com";
  const GTagSrc = "https://*.googletagmanager.com";
  const GASrc = "https://*.google-analytics.com https://*.analytics.google.com";

  const CSPHeader = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} ${turnstileSrc} ${GTagSrc}`,
    `frame-src ${turnstileSrc}`,
    `connect-src 'self' ${turnstileSrc} ${GTagSrc} ${GASrc}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: https: ${GTagSrc} ${GASrc}`,
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

  return finalResponse;
}
