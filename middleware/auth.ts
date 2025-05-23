"use server";

import { NextRequest, NextResponse } from "next/server";

import { getSession, logout } from "@/lib/auth";

// Routes to be protected
const protectedRoutes = ["/admin"];

export async function middlewareAuth(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if protection is needed
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute) {
    const session = await getSession();

    if (!session) {
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);

      loginUrl.searchParams.set("from", pathname);

      // Deleting invalid tokens
      await logout();

      return response;
    }
  }

  return NextResponse.next();
}
