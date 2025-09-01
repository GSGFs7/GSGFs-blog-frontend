"use client";

import Turnstile from "react-turnstile";

import { NEXT_PUBLIC_TURNSTILE_SITE_KEY } from "@/env/public";

export default function TurnstileWidget({
  setTokenAction,
}: {
  setTokenAction: (token: string) => void;
}) {
  if (!NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
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
