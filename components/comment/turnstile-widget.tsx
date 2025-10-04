"use client";

import Turnstile from "react-turnstile";

import { TURNSTILE_SECRET_KEY } from "@/env/private";
import { NEXT_PUBLIC_TURNSTILE_SITE_KEY } from "@/env/public";

export default function TurnstileWidget({
  setTokenAction,
}: {
  setTokenAction: (token: string) => void;
}) {
  if (!NEXT_PUBLIC_TURNSTILE_SITE_KEY || !TURNSTILE_SECRET_KEY) {
    return null;
  }

  return (
    <Turnstile
      sitekey={NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      onSuccess={(token) => {
        setTokenAction(token);
      }}
      refreshExpired="auto"
    />
  );
}
