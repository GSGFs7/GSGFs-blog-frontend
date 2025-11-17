"use client";

import type React from "react";
import { default as ReactTurnstile } from "react-turnstile";

import { NEXT_PUBLIC_TURNSTILE_SITE_KEY } from "@/env/public";
import type { Captcha, Captchas, CaptchaWidget } from "@/types/captcha";

export class Turnstile implements Captcha {
  private token: string | null = null;
  readonly type: Captchas = "Turnstile";

  private _setTokenAction(token: string) {
    this.token = token;
  }

  get getToken(): string | null {
    return this.token;
  }

  reset(): void {
    if (!window.turnstile.reset) {
      throw new Error("Turnstile widget reset method not available");
    }

    window.turnstile.reset();
  }

  render(): React.ReactNode {
    return TurnstileWidget({ setTokenAction: this._setTokenAction.bind(this) });
  }
}

export function TurnstileWidget({ setTokenAction }: CaptchaWidget) {
  if (!NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    return null;
  }

  return (
    <ReactTurnstile
      refreshExpired="auto"
      sitekey={NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      onSuccess={(token) => {
        setTokenAction(token);
      }}
    />
  );
}
