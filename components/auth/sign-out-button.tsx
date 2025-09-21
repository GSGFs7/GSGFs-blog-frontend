"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/app/providers";
import { isValidRedirectUrl } from "@/utils";

export function SignoutButton({ disabled = false }: { disabled?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useAuth();
  let callbackUrl = searchParams.get("callbackUrl");

  if (!callbackUrl || !isValidRedirectUrl(callbackUrl)) {
    callbackUrl = "/";
  }

  async function handleLogout() {
    localStorage.removeItem("last_token_refresh");

    try {
      // 代替用户触发对应的函数
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        dispatch({ type: "logout" });
        router.push(`${callbackUrl}`);
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <button
      className={`my-4 flex w-full flex-col items-center rounded-sm border-gray-300/80 px-24 py-2 text-black shadow-lg shadow-black ${disabled ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-gray-200 hover:bg-gray-300"}`}
      disabled={disabled}
      onClick={handleLogout}
    >
      {/* <Image alt={`${name} icon`} src={img} width={32} /> */}
      <span>Logout</span>
    </button>
  );
}
