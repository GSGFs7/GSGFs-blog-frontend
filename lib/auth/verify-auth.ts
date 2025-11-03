"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import type { guestLogin, sessionType } from "@/types";

export async function getSession(
  accessToken?: string,
): Promise<sessionType | null> {
  try {
    const token = accessToken
      ? accessToken
      : (await cookies()).get("access_token")?.value;

    if (!token) {
      return null;
    }

    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    const verified = await jwtVerify(token, JWT_SECRET);

    return verified.payload as sessionType;
  } catch {
    (await cookies()).delete("access_token");

    return null;
  }
}

export async function getGuest(
  accessToken?: string,
): Promise<guestLogin | null> {
  const session = await getSession(accessToken);

  if (!session) {
    return null;
  }

  return {
    name: session.name!,
    provider: session.provider!,
    provider_id: session.id!,
    avatar: session.avatar_url!,
  };
}
