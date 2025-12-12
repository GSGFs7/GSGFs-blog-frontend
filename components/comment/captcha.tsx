"use client";

import { useCaptcha } from "@/components/captcha";

export default function CommentCaptcha() {
  const captcha = useCaptcha();
  return <div>{captcha?.render()}</div>;
}
