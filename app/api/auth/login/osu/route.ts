import { randomBytes } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { AUTH_OSU_ID } from "@/env/private";
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

  const cacheKey = `osu_auth:${userIP}:${csrfToken}`;

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
  const clientId = AUTH_OSU_ID;
  // const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/osu`;

  const authUrl = `https://osu.ppy.sh/oauth/authorize?client_id=${clientId}&state=${state}&response_type=code`;

  return NextResponse.redirect(authUrl);
}
