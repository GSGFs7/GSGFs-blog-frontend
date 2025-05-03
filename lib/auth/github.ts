"use server";

import { fc } from "../fetchClient";

import { createJWT } from "./jwt";

import { githubResponse, tokenResponse } from "@/types";

export async function githubOAuth(
  code: string,
): Promise<githubResponse | null> {
  const GITHUB_CLIENT_ID = process.env.AUTH_GITHUB_ID!;
  const GITHUB_CLIENT_SECRET = process.env.AUTH_GITHUB_SECRET!;

  let accessTokenData: tokenResponse;

  // 获取一次性的 access token
  try {
    accessTokenData = await fc.post<tokenResponse>(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.SITE_URL}/api/auth/callback/github`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
  } catch (e) {
    throw new Error(`GitHub OAuth token request failed: ${e}`);
  }

  const accessTokenType = accessTokenData.token_type;
  const accessToken = accessTokenData.access_token;

  let userData: githubResponse;

  // 获取用户信息
  try {
    userData = await fc.get<githubResponse>("https://api.github.com/user", {
      headers: {
        Accept: "application/json",
        Authorization: `${accessTokenType} ${accessToken}`,
      },
    });
  } catch (e) {
    throw new Error(`GitHub get user info request failed: ${e}`);
  }

  // create JWT
  await createJWT({
    id: userData.id,
    avatar_url: userData.avatar_url,
    username: userData.login,
    show_name: userData.name,
    provider: "github",
  });

  return userData;
}
