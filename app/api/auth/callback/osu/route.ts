import { NextResponse } from "next/server";

import { osuAuth } from "@/lib/auth";
import { cacheDelete, cacheGet } from "@/lib/cache";
import type { OAuthState } from "@/types";
import { getIP } from "@/utils/ip";
import { isValidRedirectUrl } from "@/utils/valid-url";

// TODO: Merge callback routes
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url); // 获取查询参数
  const code = searchParams.get("code"); // 从 osu 重定向回来后会携带一个 code
  const stateParam = searchParams.get("state");

  if (!code || !stateParam) {
    return NextResponse.json(
      { error: "No code or state provided" },
      { status: 400 },
    );
  }

  try {
    const stateObj = JSON.parse(
      Buffer.from(stateParam, "base64").toString("utf-8"),
    ) as OAuthState;
    const { csrfToken, timestamp, useCookies } = stateObj;
    let callbackUrl = stateObj.callbackUrl;

    // validate URL
    if (!callbackUrl || !isValidRedirectUrl(callbackUrl)) {
      callbackUrl = "/";
    }

    // validate timestamp
    const now = Date.now();

    if (now - (timestamp ?? 0) > 5 * 60 * 1000) {
      return NextResponse.json(
        {
          error: "Authentication state has expired.",
        },
        { status: 400 },
      );
    }

    // validate CSRF token
    const userIP = getIP(request.headers);
    const cacheKey = `osu_auth:${userIP}:${csrfToken}`;
    let cachedState: OAuthState | null = null;

    try {
      cachedState = await cacheGet<OAuthState>(cacheKey);
    } catch (e) {
      console.error("Get cache error: ", e);

      return NextResponse.json(
        {
          error: "Failed to get cache authentication state",
        },
        { status: 500 },
      );
    }

    if (!cachedState || cachedState.csrfToken !== csrfToken) {
      return NextResponse.json(
        {
          error: "Invalid CSRF token.",
        },
        { status: 400 },
      );
    }

    try {
      await cacheDelete(cacheKey);
    } catch (e) {
      console.error("Delete cache error: ", e);
    }

    // get user data and sign JWT
    const authResult = await osuAuth(code, useCookies ?? false);

    const redirectUrl = new URL(callbackUrl, request.url);

    if (!useCookies) {
      redirectUrl.searchParams.set("access_token", authResult.accessToken);
    }

    // 需要 return
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Authentication error:", error);

    const redirectUrl = new URL("/login", request.url).toString();

    return NextResponse.redirect(redirectUrl);
  }
};
