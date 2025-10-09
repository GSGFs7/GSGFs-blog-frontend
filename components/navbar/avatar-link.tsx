"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import Link from "../link";

export default function NavAvatarLink({ children }: { children: ReactNode }) {
  const path = usePathname();

  return <Link href={`/user?callbackUrl=${path}`}>{children}</Link>;
}
