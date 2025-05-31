"use client";

import AvatarImage from "../avatar-image";

import NavAvatarLink from "./avatar-link";
import LoginButton from "./login-button";

import { useFetchAuth } from "@/hooks/auth/useFetchAuth";
import { sessionType } from "@/types";

export default function NavAvatar({
  initialSession,
}: {
  initialSession: sessionType | null;
}) {
  const { session, isLoading } = useFetchAuth();

  if (isLoading && initialSession) {
    return (
      <NavAvatarLink>
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <AvatarImage
        alt={`${session.name}'s avatar`}
        size={40}
        src={session.avatar_url ?? "/default-avatar.png"}
      />
    </NavAvatarLink>
  );
}
