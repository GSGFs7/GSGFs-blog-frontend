"use server";

import { cookies } from "next/headers";

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  // use the path parameter to specify the path, otherwise it will not be deleted
  cookieStore.delete({ name: "refresh_token", path: "/api/auth/refresh" });
}
