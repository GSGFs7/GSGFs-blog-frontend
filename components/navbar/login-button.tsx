"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AiOutlineLogin } from "react-icons/ai";

export default function LoginButton() {
  const searchParams = useSearchParams();
  const path = usePathname();

  // 如果有就传递
  if (searchParams.get("callbackUrl")) {
    return (
      <Link href={`/login?callbackUrl=${searchParams.get("callbackUrl")}`}>
        <AiOutlineLogin />
      </Link>
    );
  }

  // 没有就用当前的path
  return (
    <Link href={`/login?callbackUrl=${path}`} title="login">
      <AiOutlineLogin />
    </Link>
  );
}
