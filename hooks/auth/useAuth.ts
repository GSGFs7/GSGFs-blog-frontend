"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {} from "jose";

import { fetchSession, logout } from "@/lib/auth";

const AUTH_QUERY_KEY = ["auth", "session"];

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
    mutationFn: logout,
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
