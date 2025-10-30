import { randomBytes } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { AUTH_GITHUB_ID } from "@/env/private";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";
import { cacheSet } from "@/lib/cache";
import { OAuthState } from "@/types";
import { getIP } from "@/utils/ip";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const useCookies = searchParams.get("useCookies") === "true";
  const csrfToken = randomBytes(32).toString("hex");

  // state
  const timestamp = Date.now();
  const stateObj: OAuthState = {
    callbackUrl,
    csrfToken,
    timestamp, // add timestamp to prevent replay attacks
    useCookies, // add cookie preference
  };
  const state = Buffer.from(JSON.stringify(stateObj)).toString("base64");

  // cache the state with a unique key
  const userIP = getIP(request.headers);

  const cacheKey = `github_auth:${userIP}:${csrfToken}`;

  // make sure all information has been set
  try {
    const cached = await cacheSet(cacheKey, stateObj, 60 * 5); // Cache for 5 minutes

    if (!cached) {
      throw new Error("Failed to cache authentication state.");
    }
  } catch (e) {
    console.error("Failed to cache authentication state: ", e);

    return NextResponse.json(
      { error: "Failed to cache authentication state." },
      { status: 500 },
    );
  }

  // When returning, the state will be returned
  const clientId = AUTH_GITHUB_ID;
  const redirectUri = `${NEXT_PUBLIC_SITE_URL}/api/auth/callback/github`;

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}&scope=user&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(authUrl);
}
