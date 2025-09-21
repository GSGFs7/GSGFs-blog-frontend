"use server";

import { osuResponse, tokenResponse } from "@/types";

import { fc } from "../fetchClient";

import { createJWT } from "./jwt";

export async function osuAuth(code: string): Promise<osuResponse | null> {
  const OSU_CLIENT_ID = process.env.AUTH_OSU_ID!;
  const OSU_CLIENT_SECRET = process.env.AUTH_OSU_SECRET!;

  let accessTokenData: tokenResponse;

  try {
    accessTokenData = await fc.post<tokenResponse>(
      `https://osu.ppy.sh/oauth/token`,
      {
        client_id: OSU_CLIENT_ID,
        client_secret: OSU_CLIENT_SECRET,
        code,
        // redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/osu`, // 加上这个就不对了
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
  await createJWT({
    id: userData.id,
    username: userData.username,
    avatar_url: userData.avatar_url,
    provider: "osu",
  });

  return userData;
}
