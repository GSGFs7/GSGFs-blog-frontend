"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import NavAvatarLink from "./avatar-link";
import LoginButton from "./login-button";

import useAuth from "@/hooks/auth/useAuth";
import { sessionType } from "@/types";

export default function NavAvatar({
  initialSession,
}: {
  initialSession: sessionType | null;
}) {
  const defaultAvatar = "/default-avatar.png";
  const [session, setSession] = useState<sessionType | null>(initialSession);
  const { session: newSession, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && newSession !== undefined) {
      setSession(newSession);
    }
  }, [isLoading, newSession]);

  if (!session) return <LoginButton />;

  return (
    <NavAvatarLink>
      <Image
        unoptimized
        alt={`${session.name}'s avatar`}
        className="rounded-full"
        height={"40"}
        src={session.avatar_url ? session.avatar_url : defaultAvatar}
        width={"40"}
      />
    </NavAvatarLink>
  );
}
