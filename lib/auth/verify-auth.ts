"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

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
    return null;
  }
}
