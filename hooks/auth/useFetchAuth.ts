"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/app/providers";
import { fc } from "@/lib/fetchClient";
import { sessionType } from "@/types";

const AUTH_QUERY_KEY = ["auth", "session"];
const REFRESH_TOKEN_INTERVAL = 1000 * 60 * 45;

export async function fetchSession(): Promise<sessionType | null> {
  try {
    const session = await fc.get<sessionType | null>("/api/auth/me", {
      cache: "no-store",
      headers: { "x-timestamp": Date.now().toString() },
    });

    return session;
  } catch {
    // eslint-disable-next-line no-console
    // console.log("Failed to get session: ", e);

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
    staleTime: 1000 * 60, // 1 mins
    refetchInterval: 1000 * 60 * 5, // 5 mins
    refetchOnWindowFocus: true,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        return await fc.post("/api/auth/logout");
      } catch {
        return null;
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
    },
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      try {
        return await fc.get("/api/auth/refresh");
      } catch {
        return null;
      }
    },
    onSuccess: () => {
      localStorage.setItem("last_token_refresh", Date.now().toString());
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
    retry: 3,
    retryDelay: 1000 * 2,
  });

  const refreshSession = () => {
    queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
  };

  useEffect(() => {
    refetch();

    dispatch({ type: "update", payload: session ?? null });
  }, [session, pathname, dispatch]); // do not add refetch to the dependency array, otherwise it will cause an infinite loop

  // refresh access token
  useEffect(() => {
    const lastRefresh = localStorage.getItem("last_token_refresh");
    const now = Date.now();

    if (lastRefresh && now - parseInt(lastRefresh) < REFRESH_TOKEN_INTERVAL) {
      return;
    }

    refreshMutation.mutate();
  }, [refreshMutation, pathname, contextSession]);

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
