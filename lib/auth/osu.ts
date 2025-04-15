"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";

import { fc } from "../fetchClient";

import { osuResponse, tokenResponse } from "@/types";

export async function osuAuth(code: string): Promise<osuResponse | null> {
  const OSU_CLIENT_ID = process.env.AUTH_OSU_ID!;
  const OSU_CLIENT_SECRET = process.env.AUTH_OSU_SECRET!;
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)!;

  let accessTokenData: tokenResponse;

  try {
    accessTokenData = await fc.post(
      `https://osu.ppy.sh/oauth/token`,
      {
        client_id: OSU_CLIENT_ID,
        client_secret: OSU_CLIENT_SECRET,
        code,
        // redirect_uri: `${process.env.SITE_URL}/api/auth/callback/osu`, // 加上这个就不对了
        grant_type: "authorization_code", // 比 github 多了这个必选项
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
  } catch (e) {
    throw new Error(`OSU OAuth token request failed: ${e}`);
  }

  const accessTokenType = accessTokenData.token_type;
  const accessToken = accessTokenData.access_token;

  let userData: osuResponse;

  // 获取用户信息
  try {
    userData = await fc.get<osuResponse>(`https://osu.ppy.sh/api/v2/me/osu`, {
      headers: {
        Authorization: `${accessTokenType} ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  } catch (e) {
    throw new Error(`OSU get user info request failed: ${e}`);
  }

  // create JWT
  const token = await new SignJWT({
    id: userData.id,
    name: userData.username,
    avatar_url: userData.avatar_url,
    provider: "osu",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);

  // cookie
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return userData;
}
