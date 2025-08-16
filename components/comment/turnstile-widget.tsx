"use client";

import Script from "next/script";
import { useEffect } from "react";

import { NEXT_PUBLIC_TURNSTILE_SITE_KEY } from "@/env/public";

export default function TurnstileWidget({
  setTokenAction,
}: {
  setTokenAction: (token: string) => void;
}) {
  useEffect(() => {
    window.javascriptCallback = (token: string) => {
      setTokenAction(token);
    };

    return () => {
      delete window.javascriptCallback;
    };
  }, [setTokenAction]);

  return (
    <>
      <Script
        async
        defer
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <div
        className="cf-turnstile"
        data-callback="javascriptCallback"
        data-sitekey={NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-theme="dark"
      />
    </>
  );
}
