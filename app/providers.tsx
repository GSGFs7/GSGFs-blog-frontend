"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import * as React from "react";
import { Toaster } from "react-hot-toast";

import type { SessionType } from "@/types";

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
  | { type: "login"; payload: SessionType }
  | { type: "logout" }
  | { type: "update"; payload: Partial<SessionType> | null };

interface AuthContextType {
  session: SessionType | null;
  dispatch: React.Dispatch<AuthAction>;
  enableCookies: boolean;
  setEnableCookies: (_: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  session: null,
  dispatch: () => {},
  enableCookies: false,
  setEnableCookies: () => {},
});

export function useAuth(): AuthContextType {
  return React.useContext(AuthContext);
}

function reducer(
  state: { session: SessionType | null },
  action: AuthAction,
): { session: SessionType | null } {
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

// global loading indicator state
const LoadingContext = React.createContext({
  isLoading: false,
  setIsLoading: (_: boolean) => {},
});

export const useLoading = () => {
  return React.useContext(LoadingContext);
};

// TODO: too complicated, refactor here
export function Providers({ children, themeProps }: ProvidersProps) {
  const [{ session }, dispatch] = React.useReducer(reducer, { session: null });
  const [enableCookies, setEnableCookies] = React.useState(false);
  const authContextValue = React.useMemo(
    () => ({ session, dispatch, enableCookies, setEnableCookies }),
    [session, enableCookies],
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();

  // useSearchParams() should be wrapped in a suspense boundary
  // So, put it in nav logo component
  // biome-ignore lint/correctness/useExhaustiveDependencies: use pathname update loading state
  React.useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

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
