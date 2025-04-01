import Image from "next/image";

import LoginButton from "./login-button";
import NavAvatarLink from "./avatar-link";

import { getSession } from "@/lib/auth";

export default async function NavAvatar() {
  const session = await getSession();
  const defaultAvatar = "/default-avatar.png";

  if (session === null) return <LoginButton />;

  return (
    <NavAvatarLink>
      <Image
        alt={`${session.name}'s avatar`}
        className="rounded-full"
        height={"40"}
        src={session.avatar_url ? session.avatar_url : defaultAvatar}
        width={"40"}
      />
    </NavAvatarLink>
  );
}
