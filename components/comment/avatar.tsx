import Link from "next/link";
import { Avatar } from "@heroui/avatar";

import { getSession } from "@/lib/auth";

export default async function AvatarWithName() {
  const session = await getSession();
  const defaultAvatar = "/default-avatar.png";

  return (
    <Link className="flex w-fit flex-row items-center gap-3" href={"/user"}>
      <Avatar
        alt={session?.name ?? "avatar"}
        className="m-2 h-9 w-fit rounded-full"
        src={session?.avatar_url ?? defaultAvatar}
      />
      <span>{session ? session.name : "游客"}</span>
    </Link>
  );
}
