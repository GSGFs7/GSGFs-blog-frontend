"use client";

import AvatarImage from "@/components/avatar-image";
import { useFetchAuth } from "@/hooks/auth/useFetchAuth";
import type { SessionType } from "@/types";

import NavAvatarLink from "./avatar-link";
import LoginButton from "./login-button";

export default function NavAvatar({
  initialSession,
}: {
  initialSession: SessionType | null;
}) {
  const { session, isLoading } = useFetchAuth();

  if (isLoading && initialSession) {
    return (
      <NavAvatarLink>
        <AvatarImage
          alt={`${initialSession.name}'s avatar`}
          size={40}
          src={initialSession.avatar_url ?? "/default-avatar.png"}
        />
      </NavAvatarLink>
    );
  }

  if (!session) return <LoginButton />;

  return (
    <NavAvatarLink>
      <AvatarImage
        alt={`${session.name}'s avatar`}
        size={40}
        src={session.avatar_url ?? "/default-avatar.png"}
      />
    </NavAvatarLink>
  );
}
