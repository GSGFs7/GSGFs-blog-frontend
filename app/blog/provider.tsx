"use client";

import { useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const initValue = {
  isLoading: true,
  setIsLoading: (_: boolean) => {},
};

const BlogContext = createContext(initValue);

export const useBlogContext = () => {
  return useContext(BlogContext);
};

export default function BlogProvider({ children }: { children: ReactNode }) {
  // is now navigating to other blog lists
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoading, searchParams]);

  return (
    <>
      <BlogContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
      </BlogContext.Provider>
    </>
  );
}
