"use server";

// This is a nodejs api, it will get a error in edge runtime
// import { createHmac, randomBytes } from "crypto";

import adapter from "./adapter";

import { getGuest } from "@/lib/api/post";
import { getSession } from "@/lib/auth";
import { fc } from "@/lib/fetchClient";
import { GalData, guestLogin, IDNumber, Render } from "@/types";
import { commentMarkdownToHtml } from "@/utils/markdown";

// 测试用的函数 不应该在生产环境使用
export async function apiTest() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/test/auth`, {
      headers: {
        Authorization: `Bearer ${await (await adapter()).generateAuthToken()}`,
      },
    });

    // eslint-disable-next-line no-console
    console.log(await res.json());
  } catch {
    // eslint-disable-next-line no-console
    console.error("Encrypted connection establishment failed");
  }
}

export async function apiSendRender(render: Render) {
  await fetch(`${process.env.BACKEND_URL}/api/post/render`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await (await adapter()).generateAuthToken()}`,
    },
    body: JSON.stringify(render),
  });
}

export async function apiGuestLogin(): Promise<{ id: number } | null> {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("No guest provided");
    }

    const loginDate: guestLogin = {
      name: session.name!,
      provider: session.provider!,
      provider_id: session.id!,
      avatar_url: session.avatar_url!,
    };

    const res = await fetch(`${process.env.BACKEND_URL}/api/guest/login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await (await adapter()).generateAuthToken()}`,
      },
      body: JSON.stringify(loginDate),
    });

    // console.log(await res.json());
    if (!res.ok) {
      throw new Error("apiGuestLogin error");
    }

    const data = (await res.json()) as IDNumber;

    return { id: data.id };
  } catch {
    return null;
  }
}

export async function apiAddComment(
  content: string,
  postId: number,
  metadata: {
    user_agent?: string;
    platform?: string;
    browser?: string;
    browser_version?: string;
    OS?: string;
  },
): Promise<number | null> {
  const guest = await getGuest();

  await apiGuestLogin();

  const htmlContent = (await commentMarkdownToHtml(content)).trim();

  if (htmlContent.length < 1) return null;

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

export async function apiUpdateGal(gal: GalData): Promise<() => void> {
  const updatePromise = (async () => {
    try {
      const authToken = await (await adapter()).generateAuthToken();

      return await fc.post(`/gal/${gal.id}`, gal, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`update gal error: ${e}`);
      throw e;
    }
  })();

  // Add default error handling to prevent uncaught Promise rejections
  updatePromise.catch((e) => {
    // This error handling only occurs if the caller does not use await or .catch()
    // eslint-disable-next-line no-console
    console.error(`Unhandled gal update error for ID ${gal.id}:`, e);
  });

  return updatePromise;
}
