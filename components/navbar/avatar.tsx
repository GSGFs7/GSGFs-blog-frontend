import NavAvatarLink from "./avatar-link";
import LoginButton from "./login-button";

import { sessionType } from "@/types";

export default function NavAvatar({
  initialSession,
}: {
  initialSession: sessionType | null;
}) {
  const session = initialSession;
  const defaultAvatar = "/default-avatar.png";

  if (session === null || session === undefined) return <LoginButton />;

  return (
    <NavAvatarLink>
      {/* disable Next.js image optimize. it will cache the picture! */}
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        alt={`${session.name}'s avatar`}
        className="rounded-full"
        height={"40"}
        src={session.avatar_url ? session.avatar_url : defaultAvatar}
        width={"40"}
      />
    </NavAvatarLink>
  );
}
