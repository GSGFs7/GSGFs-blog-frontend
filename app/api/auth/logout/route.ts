import { logout } from "@/lib/auth";

export const POST = async () => {
  await logout();

  const redirectUrl = new URL("/login", process.env.SITE_URL).toString();

  return Response.redirect(redirectUrl);
};
