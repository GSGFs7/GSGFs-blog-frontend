"use server";

import adapter from "./adapter";

import { getSession } from "@/lib/auth";
import { guestLogin, IDNumber } from "@/types";

export async function apiGuestLogin(): Promise<{ id: number } | null> {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("No guest provided");
    }

    const loginDate: guestLogin = {
      name: session.name!,
      provider: session.provider!,
      provider_id: session.id!,
      avatar_url: session.avatar_url!,
    };

    const res = await fetch(`${process.env.BACKEND_URL}/api/guest/login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await (await adapter()).generateAuthToken()}`,
      },
      body: JSON.stringify(loginDate),
    });

    // console.log(await res.json());
    if (!res.ok) {
      throw new Error("apiGuestLogin error");
    }

    const data = (await res.json()) as IDNumber;

    return { id: data.id };
  } catch {
    return null;
  }
}
