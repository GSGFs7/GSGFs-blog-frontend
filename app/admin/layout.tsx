import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/login?from=/admin");
  }

  return children;
}
