"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";

import { githubResponse, tokenResponse } from "@/types";

export async function githubOAuth(
  code: string,
): Promise<githubResponse | null> {
  const GITHUB_CLIENT_ID = process.env.AUTH_GITHUB_ID!;
  const GITHUB_CLIENT_SECRET = process.env.AUTH_GITHUB_SECRET!;
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)!;

  // 获取一次性的 access token
  const accessTokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.SITE_URL}/api/auth/callback/github`,
      }),
    },
  );

  if (!accessTokenResponse.ok) {
    throw new Error(
      `GitHub OAuth token request failed: ${accessTokenResponse.statusText}`,
    );
  }

  const accessTokenData = (await accessTokenResponse.json()) as tokenResponse;
  const accessTokenType = accessTokenData.token_type;
  const accessToken = accessTokenData.access_token;

  // 获取用户信息
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `${accessTokenType} ${accessToken}`,
    },
  });

  if (!userResponse.ok) {
    throw new Error(
      `GitHub get user info request failed: ${userResponse.statusText}`,
    );
  }

  const userData: githubResponse = await userResponse.json();

  // 创建 JWT
  const token = await new SignJWT({
    id: userData.id,
    name: userData.name
      ? `${userData.name}(${userData.login})`
      : userData.login,
    avatar_url: userData.avatar_url,
    provider: "github",
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
