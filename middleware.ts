import { NextRequest } from "next/server";

import { middlewareAuth } from "./middleware/auth";
import { middlewareCSP } from "./middleware/csp";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

export async function middleware(request: NextRequest) {
  const authResponse = await middlewareAuth(request);

  return await middlewareCSP(request, authResponse);
}
