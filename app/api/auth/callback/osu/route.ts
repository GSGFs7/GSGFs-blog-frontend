import { osuAuth } from "@/lib/auth";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  // 从 github 重定向回来后会携带一个 code
  const code = searchParams.get("code");

  if (!code) {
    return new Response("No code provided", { status: 400 });
  }

  try {
    await osuAuth(code);

    // 需要 return
    const redirectUrl = new URL("/", request.url).toString();

    return Response.redirect(redirectUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Authentication error:", error);

    const redirectUrl = new URL("/login", request.url).toString();

    return Response.redirect(redirectUrl);
  }
};
