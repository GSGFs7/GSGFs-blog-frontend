"use client";

import { useAuth } from "@/app/providers";
import AvatarImage from "@/components/avatar-image";

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

  const finalAvatar = avatar ?? session?.avatar_url ?? defaultAvatar;
  const finalName = name ?? session?.name ?? "未登录";

  return (
    <div
      className={`flex w-fit items-center ${col ? "flex-col" : "flex-row gap-3"}`}
    >
      <AvatarImage
        alt={finalName}
        className="m-2"
        size={40}
        src={finalAvatar}
      />
      <span>{finalName}</span>
    </div>
  );
}
