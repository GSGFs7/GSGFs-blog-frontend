"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { sessionType } from "@/types";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)!;

export async function getSession(): Promise<sessionType | null> {
  const token = (await cookies()).get("token");

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token.value, JWT_SECRET);

    return verified.payload;
  } catch {
    return null;
  }
}
