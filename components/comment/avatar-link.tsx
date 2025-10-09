"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { useAuth } from "@/app/providers";

import Link from "../link";

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
