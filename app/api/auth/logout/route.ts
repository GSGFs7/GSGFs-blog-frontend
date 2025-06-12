import { logout } from "@/lib/auth";

// 使用 POST 触发
export const POST = async () => {
  await logout();

  // const { searchParams } = new URL(request.url);
  // let callbackUrl = searchParams.get("callbackUrl");

  // if (!callbackUrl || !isValidRedirectUrl(callbackUrl)) {
  //   callbackUrl = "/";
  // }

  const redirectUrl = new URL("/", process.env.NEXT_PUBLIC_SITE_URL).toString();

  return Response.redirect(redirectUrl);
};
