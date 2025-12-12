import "server-only";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { JWT_SECRET as _JWT_SECRET } from "@/env/private";
import type { GuestLogin, SessionType } from "@/types";

export async function getSession(
  accessToken?: string,
): Promise<SessionType | null> {
  try {
    const token = accessToken
      ? accessToken
      : (await cookies()).get("access_token")?.value;

    if (!token) {
      return null;
    }

    const JWT_SECRET = new TextEncoder().encode(_JWT_SECRET);
    const verified = await jwtVerify(token, JWT_SECRET);

    return verified.payload as SessionType;
  } catch {
    (await cookies()).delete("access_token");

    return null;
  }
}

export async function getGuest(
  accessToken?: string,
): Promise<GuestLogin | null> {
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
