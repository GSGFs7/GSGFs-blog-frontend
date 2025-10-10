"use clint";

import { createContext, ReactNode, useContext, useState } from "react";

const CommentContext = createContext({
  isPending: false,
  setIsPending: (_: boolean) => {},
});

export const useComment = () => {
  return useContext(CommentContext);
};

export default function CommentProvider({ children }: { children: ReactNode }) {
  const [isPending, setIsPending] = useState(false);
  return (
    <CommentContext.Provider value={{ isPending, setIsPending }}>
      {children}
    </CommentContext.Provider>
  );
}
