"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/app/providers";
import { fc } from "@/lib/fetchClient";
import { sessionType } from "@/types";

const AUTH_QUERY_KEY = ["auth", "session"];

export async function fetchSession(): Promise<sessionType | null> {
  try {
    const session = await fc.get<sessionType | null>("/api/auth/me", {
      cache: "no-store",
      headers: { "x-timestamp": Date.now().toString() },
    });

    return session;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return null;
  }
}

export function useFetchAuth() {
  const queryClient = useQueryClient();
  const { session: contextSession, dispatch } = useAuth();
  const pathname = usePathname();

  const {
    data: session,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: fetchSession,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => await fc.post("/api/auth/logout"),
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
    },
  });

  const refreshSession = () => {
    queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
  };

  useEffect(() => {
    refetch();

    dispatch({ type: "update", payload: session ?? null });
  }, [session, contextSession, pathname]);

  return {
    session,
    isLoading,
    error,
    refetch,
    pathname,
    isAuthenticated: !!session,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    refreshSession,
  };
}
