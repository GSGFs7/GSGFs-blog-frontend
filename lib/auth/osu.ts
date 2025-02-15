import { SignJWT } from "jose";
import { cookies } from "next/headers";

const OSU_CLIENT_ID = process.env.AUTH_OSU_ID!;
const OSU_CLIENT_SECRET = process.env.AUTH_OSU_SECRET!;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)!;

export async function osuAuth(code: string) {
  const accessTokenResponse = await fetch(`https://osu.ppy.sh/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: OSU_CLIENT_ID,
      client_secret: OSU_CLIENT_SECRET,
      code,
      redirect_uri: process.env.SITE_URL,
      grant_type: "authorization_code", // 比 github 多了这个必选项
      // state:
    }),
  });
  const accessTokenData = await accessTokenResponse.json();
  const accessToken = accessTokenData.access_token;

  if (!accessTokenResponse.ok) {
    return null;
  }

  // 获取用户信息
  const userResponse = await fetch(`https://osu.ppy.sh/api/v2/me/osu`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const userData = await userResponse.json();

  if (!userResponse.ok) {
    return null;
  }

  // 创建 JWT
  const token = await new SignJWT({
    id: userData.id,
    name: userData.name,
    // email: userData.email, // 没有邮箱
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

  // console.log(accessTokenResponse.status);
  // console.log(userResponse.status);
  // console.log(userData);

  return userData;
}
