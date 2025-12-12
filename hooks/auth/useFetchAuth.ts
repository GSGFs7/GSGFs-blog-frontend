"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/app/providers";
import { fc } from "@/lib/fetchClient";
import type { SessionType } from "@/types";

const AUTH_QUERY_KEY = ["auth", "session"];
const REFRESH_TOKEN_INTERVAL = 1000 * 60 * 45; // 45mins

function getStoredToken(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function fetchSession(): Promise<SessionType | null> {
  try {
    const session = await fc.get<SessionType | null>("/api/auth/me", {
      cache: "no-store",
      headers: { "x-timestamp": Date.now().toString() },
    });

    if (session) {
      return session;
    }

    const accessToken = getStoredToken("access_token");
    if (!accessToken) {
      return null;
    }

    return await fc.post<SessionType>("/api/auth/verify", {
      token: accessToken,
    });
  } catch {
    // console.log("Failed to get session: ", e);

    return null;
  }
}

export function useFetchAuth() {
  const queryClient = useQueryClient();
  const { dispatch } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    retry: false,
  });

  // Refresh access token on first load/route change (with state and time window debounce)
  useEffect(() => {
    if (isRefreshPending) return;

    const lastRefresh = localStorage.getItem("last_token_refresh");
    const now = Date.now();

    if (
      lastRefresh &&
      now - parseInt(lastRefresh, 10) < REFRESH_TOKEN_INTERVAL
    ) {
      return;
    }

    refreshMutate();
  }, [isRefreshPending, refreshMutate]);

  useEffect(() => {
    if (isLoading || session === undefined) {
      return;
    }

    dispatch({ type: "update", payload: session });
  }, [dispatch, isLoading, session]);

  // find 'access_token' in api callback
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (!accessToken) {
      return;
    }

    try {
      fc.post<SessionType>("/api/auth/verify", {
        token: accessToken,
      }).then((s) => {
        if (s.type !== "access") {
          throw new Error();
        }
      });
    } catch {
      sessionStorage.setItem("access_token", accessToken);
      return;
    }

    sessionStorage.removeItem("access_token");
    sessionStorage.setItem("access_token", accessToken);
  }, [searchParams]);

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
