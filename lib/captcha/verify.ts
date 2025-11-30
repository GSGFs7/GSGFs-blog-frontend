"use server";

import { TURNSTILE_SECRET_KEY } from "@/env/private";
import { fc } from "@/lib/fetchClient";

import { capServer } from "./cap";
import { getCaptcha } from "./switch";

export async function verifyCapToken(token: string): Promise<boolean> {
  try {
    const { success } = await capServer.validateToken(token);
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

export async function verifyCaptchaToken(token: string): Promise<boolean> {
  switch (await getCaptcha()) {
    case "Cap":
      return await verifyCapToken(token);
    case "Turnstile":
      return await verifyTurnstileToken(token);
    default:
      return false;
  }
}
