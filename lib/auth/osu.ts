import "server-only";

import { AUTH_OSU_ID, AUTH_OSU_SECRET } from "@/env/private";
import { fc } from "@/lib/fetchClient";
import type { JWTResult, osuResponse, tokenResponse } from "@/types";

import { createJWT } from "./jwt";

export async function osuAuth(
  code: string,
  useCookies: boolean = false,
): Promise<JWTResult> {
  const OSU_CLIENT_ID = AUTH_OSU_ID;
  const OSU_CLIENT_SECRET = AUTH_OSU_SECRET;

  let accessTokenData: tokenResponse;

  try {
    accessTokenData = await fc.post<tokenResponse>(
      `https://osu.ppy.sh/oauth/token`,
      {
        client_id: OSU_CLIENT_ID,
        client_secret: OSU_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
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
        Accept: "application/json",
        Authorization: `${accessTokenType} ${accessToken}`,
      },
    });
  } catch (e) {
    throw new Error(`OSU get user info request failed: ${e}`);
  }

  // create JWT
  const authResult = await createJWT(
    {
      id: userData.id,
      username: userData.username,
      avatar_url: userData.avatar_url,
      provider: "osu",
    },
    useCookies,
  );

  return authResult;
}
