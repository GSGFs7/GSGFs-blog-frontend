"use client";

import Image from "next/image";

import NavAvatarLink from "./avatar-link";
import LoginButton from "./login-button";

import { useFetchAuth } from "@/hooks/auth/useFetchAuth";
import { sessionType } from "@/types";

export default function NavAvatar({
  initialSession,
}: {
  initialSession: sessionType | null;
}) {
  const defaultAvatar = "/default-avatar.png";
  const { session, isLoading } = useFetchAuth();

  if (isLoading && initialSession) {
    return (
      <NavAvatarLink>
        <Image
          alt={`${initialSession.name}'s avatar`}
          className="rounded-full"
          height={"40"}
          src={
            initialSession.avatar_url
              ? initialSession.avatar_url
              : defaultAvatar
          }
          width={"40"}
        />
      </NavAvatarLink>
    );
  }

  if (!session) return <LoginButton />;

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
