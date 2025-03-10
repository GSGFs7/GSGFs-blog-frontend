"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function CommentAvatarLink({
  children,
  type,
}: {
  children: ReactNode;
  type: "login" | "user";
}) {
  const path = usePathname();

  return <Link href={`/${type}?callbackUrl=${path}`}>{children}</Link>;
}
