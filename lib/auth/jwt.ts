import { SignJWT } from "jose";
import { cookies } from "next/headers";

import { userData } from "@/types";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET!,
);

export async function createJWT(userData: userData) {
  let show_name = "";

  if (userData.provider === "github") {
    // if user set name, show 'name(Github ID)'
    show_name = userData.show_name
      ? `${userData.show_name}(${userData.username})`
      : userData.username;
  } else {
    show_name = userData.username;
  }

  const accessToken = await new SignJWT({
    id: userData.id,
    name: show_name,
    avatar_url: userData.avatar_url,
    provider: userData.provider,
    type: "access",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET);

  const refreshToken = await new SignJWT({
    id: userData.id,
    name: show_name,
    avatar_url: userData.avatar_url,
    provider: userData.provider,
    type: "refresh",
    version: 1,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(JWT_REFRESH_SECRET);

  // set cookie
  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1, // 1 hour
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth/refresh", // refresh only
    maxAge: 60 * 60 * 24 * 14, // 2 weeks
  });
}
