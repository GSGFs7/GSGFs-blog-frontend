import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const callbackUrl = searchParams.get("callbackUrl");

  const clientId = process.env.AUTH_OSU_ID;
  const redirectUrl = `${process.env.SITE_URL}/api/auth/callback/osu`;

  const state = Buffer.from(JSON.stringify({ callbackUrl })).toString("base64");
  const authUrl = `https://osu.ppy.sh/oauth/authorize?client_id=${clientId}&state=${state}&redirectUrl=${redirectUrl}&response_type=code`;

  return NextResponse.redirect(authUrl);
}
