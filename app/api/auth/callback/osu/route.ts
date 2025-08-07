import { NextResponse } from "next/server";

import { osuAuth } from "@/lib/auth";
import { cacheDelete, cacheGet } from "@/lib/cache";
import { OAuthState } from "@/types";
import { isValidRedirectUrl } from "@/utils";

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
    );
    const { csrfToken, timestamp } = stateObj;
    let callbackUrl = stateObj.callbackUrl;

    // validate URL
    if (!callbackUrl || !isValidRedirectUrl(callbackUrl)) {
      callbackUrl = "/";
    }

    // validate timestamp
    const now = Date.now();

    if (now - timestamp > 5 * 60 * 1000) {
      return NextResponse.json(
        {
          error: "Authentication state has expired.",
        },
        { status: 400 },
      );
    }

    // validate CSRF token
    const userIP =
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-cf-connecting-ip") ||
      "unknown";
    const cacheKey = `osu_auth:${userIP}:${csrfToken}`;
    let cachedState: OAuthState | null = null;

    try {
      cachedState = await cacheGet<OAuthState>(cacheKey);
    } catch (e) {
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.error("Delete cache error: ", e);
    }

    // get user data and sign JWT
    await osuAuth(code);

    const redirectUrl = new URL(callbackUrl, request.url).toString();

    // 需要 return
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Authentication error:", error);

    const redirectUrl = new URL("/login", request.url).toString();

    return NextResponse.redirect(redirectUrl);
  }
};
