"use server";

// This is a nodejs api, it will get a error in edge runtime
// import { createHmac, randomBytes } from "crypto";

import adapter from "./adapter";

import { getGuest } from "@/lib/api/post";
import { getSession } from "@/lib/auth";
import { mailAdmin } from "@/lib/email";
import { fc } from "@/lib/fetchClient";
import supabase from "@/lib/supabase";
import {
  GalData,
  guestLogin,
  IDNumber,
  MessageResponse,
  Render,
} from "@/types";
import { getTimeDiffDays, getTimeDiffMins } from "@/utils";
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

// monitor backend online status
export async function apiGetBackendStatus(): Promise<MessageResponse | null> {
  try {
    const res = await fc.get<MessageResponse>("/health", {
      headers: {
        cache: "no-store",
      },
    });

    if (res.message !== "OK") {
      throw new Error("Server is down");
    }

    return res;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`getBackendStatus error: ${e}`);

    const mailBody = `
        <h2>Backend Service Alert</h2>
        <p>The backend service is currently unavailable.</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Error:</strong> ${e}</p>
        <p>This alert will not be repeated for the next 1 day.</p>`;

    if (!supabase) return null;

    try {
      const { data, status, statusText } = await supabase
        .from("status-cache")
        .select("*")
        .eq("id", 1)
        .single();

      if (status !== 200) {
        throw new Error(`fetch supabase error:${statusText}`);
      }

      // 3 mins
      if (getTimeDiffMins(data.last_modified_time) < 1) {
        return null;
      }

      // if error occurred 3 times, mail to website admin
      if (data.error_count === 3) {
        mailAdmin("Backend is down", mailBody);

        const new_row = {
          last_modified_time: new Date(),
          error_count: 4,
          alerted: true,
        };

        await supabase.from("status-cache").update(new_row).eq("id", 1);
      }

      if (getTimeDiffDays(data.last_modified_time) >= 1) {
        const new_row = {
          last_modified_time: new Date(),
          error_count: 1,
          alerted: false,
        };

        await supabase.from("status-cache").update(new_row).eq("id", 1);
      } else {
        const new_row = {
          last_modified_time: new Date(),
          error_count: data.error_count > 3 ? 4 : data.error_count + 1,
          alerted: false,
        };

        await supabase.from("status-cache").update(new_row).eq("id", 1);
      }
    } catch (mailError) {
      // eslint-disable-next-line no-console
      console.error("Failed to send alert email:", mailError);
    }

    return null;
  }
}
