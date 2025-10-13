"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface CommentContextType {
  isPending: boolean;
  setIsPending: (_: boolean) => void;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useComment = () => {
  const context = useContext(CommentContext);

  if (context === undefined) {
    throw new Error("Context was used outside provider.");
  }

  return context;
};

export default function CommentProvider({ children }: { children: ReactNode }) {
  const [isPending, setIsPending] = useState(false);

  return (
    <CommentContext.Provider value={{ isPending, setIsPending }}>
      {children}
    </CommentContext.Provider>
  );
}
