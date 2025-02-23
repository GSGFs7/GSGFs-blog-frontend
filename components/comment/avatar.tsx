import Image from "next/image";
import Link from "next/link";

import { getSession } from "@/lib/auth";

export default async function AvatarWithName() {
  const session = await getSession();
  const defaultAvatar = "/default-avatar.png";

  return (
    <Link className="flex w-fit flex-row items-center gap-3" href={"/user"}>
      <Image
        alt={session?.name ?? "avatar"}
        className="m-2 h-9 w-fit rounded-full"
        height={"40"}
        src={session?.avatar_url ? session.avatar_url : defaultAvatar}
        width={"40"}
      />
      <span>{session ? session.name : "游客"}</span>
    </Link>
  );
}
