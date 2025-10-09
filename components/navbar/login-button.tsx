"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { AiOutlineLogin } from "react-icons/ai";

import Link from "../link";

export default function LoginButton() {
  const searchParams = useSearchParams();
  const path = usePathname();

  // pass params
  if (searchParams.get("callbackUrl")) {
    return (
      <Link href={`/login?callbackUrl=${searchParams.get("callbackUrl")}`}>
        <AiOutlineLogin />
      </Link>
    );
  }

  return (
    <Link href={`/login?callbackUrl=${path}`} title="login">
      <AiOutlineLogin />
    </Link>
  );
}
