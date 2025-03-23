export const runtime = "edge";

import { githubOAuth } from "@/lib/auth";
import { isValidRedirectUrl } from "@/utils";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url); // 获取查询参数
  const code = searchParams.get("code"); // 从 github 重定向回来后会携带一个 code
  const state = searchParams.get("state");
  let callbackUrl = JSON.parse(
    Buffer.from(state || "", "base64").toString(),
  ).callbackUrl;

  if (!callbackUrl || !isValidRedirectUrl(callbackUrl)) {
    callbackUrl = "/";
  }

  if (!code) {
    return new Response("No code provided", { status: 400 });
  }

  try {
    await githubOAuth(code);

    const redirectUrl = new URL(callbackUrl, request.url).toString();

    // 需要 return
    return Response.redirect(redirectUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Authentication error:", error);

    const redirectUrl = new URL("/login", request.url).toString();

    return Response.redirect(redirectUrl);
  }
};
