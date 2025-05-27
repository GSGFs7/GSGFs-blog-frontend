"use client";

import Image from "next/image";

import { useAuth } from "@/app/providers";

export default function CommentAvatar({
  col = false,
  avatar,
  name,
}: {
  col?: boolean;
  avatar?: string;
  name?: string;
}) {
  const defaultAvatar = "/default-avatar.png";
  const { session } = useAuth();

  avatar = avatar ?? session?.avatar_url ?? defaultAvatar;
  name = name ?? session?.name ?? "未登录";

  return (
    <div
      className={`flex w-fit items-center ${col ? "flex-col" : "flex-row gap-3"}`}
    >
      <Image
        alt={name ?? "avatar"}
        className="m-2 h-9 w-fit rounded-full"
        height={"40"}
        src={avatar}
        width={"40"}
      />
      <span>{name}</span>
    </div>
  );
}
