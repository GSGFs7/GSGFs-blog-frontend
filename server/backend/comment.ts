"use server";

import adapter from "./adapter";
import { apiGuestLogin } from "./login";

import { getGuest } from "@/lib/api";
import { fc } from "@/lib/fetchClient";
import { IDNumber } from "@/types";
import { commentMarkdownToHtml } from "@/utils/markdown";

export async function apiAddComment(
  content: string,
  postId: number,
  token: string,
  metadata: {
    user_agent?: string;
    platform?: string;
    browser?: string;
    browser_version?: string;
    OS?: string;
  },
): Promise<number | string | null> {
  const guest = await getGuest();

  await apiGuestLogin();

  const htmlContent = (await commentMarkdownToHtml(content)).trim();

  if (htmlContent.length < 1) return null;

  // if not set cache disable the verify
  try {
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const formData = new URLSearchParams();

    formData.append("secret", process.env.TURNSTILE_SECRET_KEY ?? "");
    formData.append("response", token);

    const res = await fc.postForm(url, formData);

    if (!res.success) {
      throw new Error("Turnstile 验证失败");
    }
  } catch (e) {
    return String(e);
  }

  const body = JSON.stringify({
    unique_id: `${guest?.provider}-${guest?.provider_id}`,
    content: htmlContent,
    post_id: postId,
    metadata,
  });

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/comment/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await (await adapter()).generateAuthToken()}`,
      },
      body,
    });
    const data = (await res.json()) as IDNumber;

    return data.id;
  } catch {
    return null;
  }
}
