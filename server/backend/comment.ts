"use server";

import { getGuest } from "@/lib/auth";
import { getCaptcha, isCaptchaEnabled } from "@/lib/captcha";
import { verifyCapToken, verifyTurnstileToken } from "@/lib/captcha/verify";
import { fc } from "@/lib/fetchClient";
import type { ApiResult, IDNumber } from "@/types";
import { commentMarkdownToHtml } from "@/utils/markdown";

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
  accessToken?: string,
): Promise<ApiResult<number>> {
  if (typeof content !== "string") {
    return {
      ok: false,
      message: "内容必须为字符串",
    };
  }

  if (content.trim().length > 5000) {
    return {
      ok: false,
      message: "内容过长",
    };
  }

  try {
    // ensure guest record exist
    const res = await apiGuestLogin(accessToken);
    if (!res.ok) {
      return {
        ok: false,
        message: "用户验证失败",
      };
    }
  } catch {
    return {
      ok: false,
      message: "用户验证失败",
    };
  }

  const htmlContent = (await commentMarkdownToHtml(content)).trim();

  if (htmlContent.length < 1) {
    return {
      ok: false,
      message: "请输入内容",
    };
  }

  // CAPTCHA validation
  if (await isCaptchaEnabled()) {
    const captchaType = await getCaptcha();

    let success: boolean;
    if (captchaType === "Cap") {
      success = await verifyCapToken(token);
    } else if (captchaType === "Turnstile") {
      success = await verifyTurnstileToken(token);
    } else {
      return {
        ok: false,
        message: "未知的 CAPTCHA",
      };
    }

    if (!success) {
      return {
        ok: false,
        message: "CAPTCHA 验证失败",
      };
    }
  }

  const guest = await getGuest(accessToken);
  if (!guest) {
    return {
      ok: false,
      message: "用户验证失败",
    };
  }

  const body = {
    unique_id: `${guest?.provider}-${guest?.provider_id}`,
    content: htmlContent,
    post_id: postId,
    metadata,
  };

  try {
    const data = await fc.post<IDNumber>(`comment/new`, body, {
      headers: {
        Authorization: `Bearer ${await generateAuthToken()}`,
      },
    });

    return { ok: true, data: data.id };
  } catch (e) {
    console.error(e);
    return { ok: false, message: "创建失败" };
  }
}
