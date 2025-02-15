"use client";

import Image from "next/image";

export default function SigninButton({
  img,
  name,
  disabled = false,
}: {
  img: string;
  name: "github" | "osu";
  disabled?: boolean;
}) {
  function github() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user`;

    window.location.href = githubAuthUrl;
  }

  function osu() {
    const osuAuthUrl = `https://osu.ppy.sh/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_OSU_CLIENT_ID}&response_type=code`;

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
