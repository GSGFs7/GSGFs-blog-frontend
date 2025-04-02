"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export const dynamic = "force-dynamic";

// declare module "@react-types/shared" {
//   interface RouterConfig {
//     routerOptions: NonNullable<
//       Parameters<ReturnType<typeof useRouter>["push"]>[1]
//     >;
//   }
// }

export function Providers({ children, themeProps }: ProvidersProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000,
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        containerClassName="text-lg"
        containerStyle={{ margin: "64px" }}
        gutter={12}
        position="top-center"
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            maxWidth: "500px",
            backgroundColor: "#dfdfdf",
          },
        }}
      />
    </QueryClientProvider>
  );
}
