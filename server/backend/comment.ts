"use server";

import { TURNSTILE_SECRET_KEY } from "@/env/private";
import { NEXT_PUBLIC_TURNSTILE_SITE_KEY } from "@/env/public";
import { getGuest } from "@/lib/auth";
import { fc } from "@/lib/fetchClient";
import { IDNumber } from "@/types";
import { errorToString } from "@/utils/errorToString";
import { commentMarkdownToHtml } from "@/utils/markdown";

import { BackendApiFunctionResult } from ".";
import { generateAuthToken } from "./adapter/adapter-nodejs-runtime";
import { apiGuestLogin } from "./guest";

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
): Promise<BackendApiFunctionResult<number>> {
  const guest = await getGuest();

  try {
    // ensure guest record exist
    await apiGuestLogin();
  } catch (e) {
    return {
      ok: false,
      message: errorToString(e),
    };
  }

  const htmlContent = (await commentMarkdownToHtml(content)).trim();

  if (htmlContent.length < 1) {
    return {
      ok: false,
      message: "请输入内容",
    };
  }

  if (NEXT_PUBLIC_TURNSTILE_SITE_KEY && TURNSTILE_SECRET_KEY) {
    try {
      const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
      const formData = new URLSearchParams();

      formData.append("secret", TURNSTILE_SECRET_KEY);
      formData.append("response", token);

      const res = await fc.postForm(url, formData);

      if (!res.success) {
        throw new Error("Turnstile verification failed");
      }
    } catch {
      return { ok: false, message: "Turnstile 验证失败" };
    }
  }

  const body = JSON.stringify({
    unique_id: `${guest?.provider}-${guest?.provider_id}`,
    content: htmlContent,
    post_id: postId,
    metadata,
  });

  try {
    const data = await fc.post<IDNumber>(`comment/new`, body, {
      headers: {
        Authorization: `Bearer ${await generateAuthToken()}`,
      },
    });

    return { ok: true, data: data.id };
  } catch (e) {
    console.error(e);
    return { ok: false, message: errorToString(e) };
  }
}
