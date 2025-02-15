import { cookies } from "next/headers";
import { SignJWT } from "jose";

import { githubResponse } from "@/types";

const GITHUB_CLIENT_ID = process.env.AUTH_GITHUB_ID!;
const GITHUB_CLIENT_SECRET = process.env.AUTH_GITHUB_SECRET!;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)!;

export async function githubOAuth(
  code: string,
): Promise<githubResponse | null> {
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
  const accessTokenData = await accessTokenResponse.json();
  const accessTokenType = accessTokenData.token_type;
  const accessToken = accessTokenData.access_token;

  if (!accessTokenResponse.ok) {
    return null;
  }

  // 获取用户信息
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `${accessTokenType} ${accessToken}`,
    },
  });
  const userData: githubResponse = await userResponse.json();

  if (!userResponse.ok) {
    return null;
  }

  // 创建 JWT
  const token = await new SignJWT({
    id: userData.id,
    name: userData.name,
    email: userData.email,
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
