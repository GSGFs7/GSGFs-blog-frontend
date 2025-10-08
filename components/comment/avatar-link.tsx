"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { useAuth } from "@/app/providers";

interface props {
  children: ReactNode;
}

export default function CommentAvatarLink({ children }: props) {
  const path = usePathname();
  const { session } = useAuth();

  return (
    <Link href={`/${session ? "user" : "login"}?callbackUrl=${path}`}>
      {children}
    </Link>
  );
}
