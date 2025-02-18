import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

// 需要保护的路由
const protectedRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 检查是否需要保护
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute) {
    const session = await getSession();

    if (!session) {
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);

      loginUrl.searchParams.set("from", pathname);
      request.cookies.delete("token"); // 删除无效的 token

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
