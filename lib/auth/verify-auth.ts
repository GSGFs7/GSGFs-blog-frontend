"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { fc } from "../fetchClient";

import { sessionType } from "@/types";

export async function getSession(): Promise<sessionType | null> {
  try {
    const token = (await cookies()).get("token");

    if (!token) {
      return null;
    }

    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    const verified = await jwtVerify(token.value, JWT_SECRET);

    return verified.payload as sessionType;
  } catch {
    (await cookies()).delete("token");

    return null;
  }
}

export async function fetchSession(): Promise<sessionType | null> {
  try {
    const session = await fc.get<sessionType>("/api/auth/me", {
      cache: "no-store",
      headers: { "x-timestamp": Date.now().toString() },
    });

    return session;
  } catch {
    return null;
  }
}
