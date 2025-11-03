"use server";

import { CAP_SECRET_KEY, TURNSTILE_SECRET_KEY } from "@/env/private";
import {
  NEXT_PUBLIC_CAP_INSTANCE_URL,
  NEXT_PUBLIC_CAP_SITE_KEY,
} from "@/env/public";
import { fc } from "@/lib/fetchClient";

export async function verifyCapToken(token: string): Promise<boolean> {
  const url = `${NEXT_PUBLIC_CAP_INSTANCE_URL}/${NEXT_PUBLIC_CAP_SITE_KEY}/siteverify`;
  const secret = CAP_SECRET_KEY!;
  const payload = {
    secret,
    response: token,
  };

  try {
    const { success } = await fc.post<{ success: boolean }>(url, payload);
    return success;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const secret = TURNSTILE_SECRET_KEY!;
  const payload = new URLSearchParams();
  payload.append("secret", secret);
  payload.append("response", token);

  try {
    const { success } = await fc.postForm(url, payload);
    return success;
  } catch (e) {
    console.error(e);
    return false;
  }
}
