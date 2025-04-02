"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {} from "jose";

import { fc } from "@/lib/fetchClient";
import { sessionType } from "@/types";

const AUTH_QUERY_KEY = ["auth", "session"];

export async function fetchSession(): Promise<sessionType | null> {
  try {
    const session = await fc.get<sessionType>("/api/auth/me", {
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

export default function useAuth() {
  const queryClient = useQueryClient();

  const {
    data: session,
    isLoading,
    error,
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

  return {
    session,
    isLoading,
    error,
    isAuthenticated: !!session,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    refreshSession,
  };
}
