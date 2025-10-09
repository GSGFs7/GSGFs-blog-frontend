"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import * as React from "react";
import { Toaster } from "react-hot-toast";

import { sessionType } from "@/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

// declare module "@react-types/shared" {
//   interface RouterConfig {
//     routerOptions: NonNullable<
//       Parameters<ReturnType<typeof useRouter>["push"]>[1]
//     >;
//   }
// }

type AuthAction =
  | { type: "login"; payload: sessionType }
  | { type: "logout" }
  | { type: "update"; payload: Partial<sessionType> | null };

interface AuthContextType {
  session: sessionType | null;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = React.createContext<AuthContextType>({
  session: null,
  dispatch: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function reducer(
  state: { session: sessionType | null },
  action: AuthAction,
): { session: sessionType | null } {
  switch (action.type) {
    case "login":
      return { session: action.payload };
    case "logout":
      return { session: null };
    case "update":
      return {
        session: action.payload
          ? { ...state.session, ...action.payload }
          : null,
      };
    default:
      throw new Error("Unknown action");
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
});

const LoadingContext = React.createContext({
  isLoading: false,
  setIsLoading: (_: boolean) => {},
});

export const useLoading = () => {
  return React.useContext(LoadingContext);
};

export function Providers({ children, themeProps }: ProvidersProps) {
  const [{ session }, dispatch] = React.useReducer(reducer, { session: null });
  const authContextValue = React.useMemo(
    () => ({ session, dispatch }),
    [session],
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authContextValue}>
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </LoadingContext.Provider>
      </AuthContext.Provider>
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
