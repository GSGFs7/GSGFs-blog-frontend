"use client";

import type React from "react";
import { createContext, useContext } from "react";

import type { Captcha, Captchas } from "@/types/captcha";

import { Cap } from "./cap";
import { Turnstile } from "./turnstile";

interface CaptchaContextType {
  captcha: Captcha | null;
}

const CaptchaContext = createContext<CaptchaContextType>({
  captcha: null,
});

export function useCaptcha() {
  const context = useContext(CaptchaContext);
  if (!context) {
    throw new Error("'useCaptcha' must be used within 'CaptchaProvider'");
  }
  return context.captcha;
}

export function CaptchaProvider({
  children,
  captchaType,
}: {
  children: React.ReactNode;
  captchaType: Captchas | null;
}) {
  let captcha: Captcha | null = null;

  if (captchaType === "Cap") {
    captcha = new Cap();
  } else if (captchaType === "Turnstile") {
    captcha = new Turnstile();
  }

  return (
    <CaptchaContext.Provider value={{ captcha }}>
      {children}
    </CaptchaContext.Provider>
  );
}
