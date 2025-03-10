"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SigninButton({
  img,
  name,
  disabled = false,
}: {
  img: string;
  name: "github" | "osu";
  disabled?: boolean;
}) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  function github() {
    // const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user`;
    const githubAuthUrl = `/api/auth/login/github?callbackUrl=${callbackUrl}`;

    window.location.href = githubAuthUrl;
  }

  function osu() {
    // const osuAuthUrl = `https://osu.ppy.sh/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_OSU_CLIENT_ID}&response_type=code`;
    const osuAuthUrl = `/api/auth/login/osu?callbackUrl=${callbackUrl}`;

    window.location.href = osuAuthUrl;
  }

  function handle() {
    if (name === "github") {
      github();
    } else if (name === "osu") {
      osu();
    }
  }

  return (
    <button
      className={`my-4 flex w-full flex-col items-center rounded-sm border-gray-300/80 px-24 py-2 text-black shadow-lg shadow-black ${disabled ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-gray-200 hover:bg-gray-300"}`}
      disabled={disabled}
      onClick={handle}
    >
      <Image alt={`${name} icon`} src={img} width={32} />
      <span>Login with {name}</span>
    </button>
  );
}
