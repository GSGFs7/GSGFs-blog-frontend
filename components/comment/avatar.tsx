import Image from "next/image";

import { getSession } from "@/lib/auth";

export default async function CommentAvatar({
  col = false,
}: {
  col?: boolean;
}) {
  const session = await getSession();
  const defaultAvatar = "/default-avatar.png";

  return (
    <div
      className={`flex w-fit items-center ${col ? "flex-col" : "flex-row gap-3"}`}
    >
      <Image
        alt={session?.name ?? "avatar"}
        className="m-2 h-9 w-fit rounded-full"
        height={"40"}
        src={session?.avatar_url ? session.avatar_url : defaultAvatar}
        width={"40"}
      />
      <span>{session ? session.name : "游客"}</span>
    </div>
  );
}
