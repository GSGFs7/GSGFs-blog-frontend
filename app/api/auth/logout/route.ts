import { NEXT_PUBLIC_SITE_URL } from "@/env/public";
import { logout } from "@/lib/auth";

export const POST = async () => {
  await logout();

  // const { searchParams } = new URL(request.url);
  // let callbackUrl = searchParams.get("callbackUrl");

  // if (!callbackUrl || !isValidRedirectUrl(callbackUrl)) {
  //   callbackUrl = "/";
  // }

  const redirectUrl = new URL("/", NEXT_PUBLIC_SITE_URL).toString();

  return Response.redirect(redirectUrl);
};
