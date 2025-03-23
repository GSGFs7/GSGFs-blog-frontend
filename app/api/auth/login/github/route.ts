import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const callbackUrl = searchParams.get("callbackUrl");

  // 返回的时候会归还 state
  const clientId = process.env.AUTH_GITHUB_ID;
  const redirectUrl = `${process.env.SITE_URL}/api/auth/callback/github`;

  const state = Buffer.from(JSON.stringify({ callbackUrl })).toString("base64");
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&state=${state}&redirectUrl=${redirectUrl}`;

  return NextResponse.redirect(authUrl);
}
