"use server";

import { siteConfig } from "@/config/site";
import { TURNSTILE_SECRET_KEY } from "@/env/private";
import { NEXT_PUBLIC_TURNSTILE_SITE_KEY } from "@/env/public";
import type { Captchas } from "@/types/captcha";

export async function isCaptchaEnabled(): Promise<boolean> {
  return siteConfig.enableCaptcha;
}

export async function getCaptcha(): Promise<Captchas | null> {
  if (!siteConfig.enableCaptcha) {
    return null;
  }

  const preference = process.env.CAPTCHA_PREFERENCE;
  if (preference?.toLowerCase() === "cap") {
    return "Cap";
  } else if (preference?.toLowerCase() === "turnstile") {
    if (NEXT_PUBLIC_TURNSTILE_SITE_KEY && TURNSTILE_SECRET_KEY) {
      return "Turnstile";
    }
  }

  // default use cap
  return "Cap";
}
