import { randomBytes } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { cacheSet } from "@/lib/cache";
import { OAuthState } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const csrfToken = randomBytes(32).toString("hex");

  // state
  const timestamp = Date.now();
  const stateObj: OAuthState = {
    callbackUrl,
    csrfToken,
    timestamp, // add timestamp to prevent replay attacks
  };
  const state = Buffer.from(JSON.stringify(stateObj)).toString("base64");

  // cache the state with a unique key
  const userIP =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-cf-connecting-ip") ||
    "unknown";
  const cacheKey = `github_auth:${userIP}:${csrfToken}`;

  // make sure all information has been set
  const cached = await cacheSet(cacheKey, stateObj, 60 * 5); // Cache for 5 minutes

  if (!cached) {
    return NextResponse.json(
      { error: "Failed to cache authentication state." },
      { status: 500 },
    );
  }

  // When returning, the state will be returned
  const clientId = process.env.AUTH_GITHUB_ID;
  const redirectUri = `${process.env.SITE_URL}/api/auth/callback/github`;

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}&scope=user&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(authUrl);
}
