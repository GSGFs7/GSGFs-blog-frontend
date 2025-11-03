"use server";

import { CAP_SECRET_KEY, TURNSTILE_SECRET_KEY } from "@/env/private";
import {
  NEXT_PUBLIC_CAP_INSTANCE_URL,
  NEXT_PUBLIC_CAP_SITE_KEY,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY,
} from "@/env/public";
import type { Captchas } from "@/types/captcha";

export async function isCaptchaEnabled(): Promise<boolean> {
  if (
    NEXT_PUBLIC_CAP_INSTANCE_URL &&
    NEXT_PUBLIC_CAP_SITE_KEY &&
    CAP_SECRET_KEY
  ) {
    return true;
  }

  if (NEXT_PUBLIC_TURNSTILE_SITE_KEY && TURNSTILE_SECRET_KEY) {
    return true;
  }

  return false;
}

export async function getCaptcha(): Promise<Captchas | null> {
  const preference = process.env.CAPTCHA_PREFERENCE;
  if (preference?.toLowerCase() === "cap") {
    if (
      NEXT_PUBLIC_CAP_INSTANCE_URL &&
      NEXT_PUBLIC_CAP_SITE_KEY &&
      CAP_SECRET_KEY
    ) {
      return "Cap";
    }
  } else if (preference?.toLowerCase() === "turnstile") {
    if (NEXT_PUBLIC_TURNSTILE_SITE_KEY && TURNSTILE_SECRET_KEY) {
      return "Turnstile";
    }
  }

  // default cap priority
  if (
    NEXT_PUBLIC_CAP_INSTANCE_URL &&
    NEXT_PUBLIC_CAP_SITE_KEY &&
    CAP_SECRET_KEY
  ) {
    return "Cap";
  }
  if (NEXT_PUBLIC_TURNSTILE_SITE_KEY && TURNSTILE_SECRET_KEY) {
    return "Turnstile";
  }

  return null;
}
