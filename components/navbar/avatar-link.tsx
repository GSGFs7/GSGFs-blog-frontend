"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavAvatarLink({ children }: { children: ReactNode }) {
  const path = usePathname();

  return <Link href={`/user?callbackUrl=${path}`}>{children}</Link>;
}
