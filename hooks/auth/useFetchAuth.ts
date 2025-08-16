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
    staleTime: 1000 * 60, // 1 min
    refetchInterval: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
    retry: 1,
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
      dispatch({ type: "update", payload: null });
    },
  });

  const { mutate: refreshMutate, isPending: isRefreshPending } = useMutation({
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
    retry: 1,
    retryDelay: 2000,
  });

  // Refresh access token on first load/route change (with state and time window debounce)
  useEffect(() => {
    if (isRefreshPending) return;

    const lastRefresh = localStorage.getItem("last_token_refresh");
    const now = Date.now();

    if (lastRefresh && now - parseInt(lastRefresh) < REFRESH_TOKEN_INTERVAL) {
      return;
    }

    refreshMutate();
  }, [pathname, contextSession, isRefreshPending, refreshMutate]);

  useEffect(() => {
    if (isLoading === true || session === undefined) {
      return;
    }

    dispatch({ type: "update", payload: session });
  }, [dispatch, isLoading, session]);

  return {
    session,
    isLoading,
    error,
    refetch,
    pathname,
    isAuthenticated: !!session,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    refreshSession: () =>
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY }),
  };
}
