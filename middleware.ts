import { NextRequest } from "next/server";

import { middlewareAuth } from "./middleware/auth";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  return middlewareAuth(request);
}
