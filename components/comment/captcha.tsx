"use client";

import { useCaptcha } from "@/components/captcha/provider";

export function CommentCaptcha() {
  const captcha = useCaptcha();
  return <div>{captcha?.render()}</div>;
}
