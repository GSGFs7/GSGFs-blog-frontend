"use client";

import { useRouter } from "next/navigation";

export default function SignoutButton({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
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
