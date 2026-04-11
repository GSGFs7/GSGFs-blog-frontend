import { createContext, type RefObject, useContext } from "react";

import type { PostCardWithSimilarity } from "@/types";

export interface PostSearchInterface {
  // ref
  inputRef: RefObject<HTMLInputElement | null>;

  hasSearched: boolean;
  setHasSearched: (hasSearched: boolean) => void;

  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;

  results: PostCardWithSimilarity[];
  setResults: (results: PostCardWithSimilarity[]) => void;

  query: string;
  setQuery(query: string): void;

  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;

  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;

  // overlay
  openOverlay: () => void;
  closeOverlay: () => void;

  // handler
  handleSearch: () => void;
  handleResultClick: (postId: number) => void;
}

export const PostSearchContext = createContext<PostSearchInterface | undefined>(
  undefined,
);

export const usePostSearch = () => {
  const res = useContext(PostSearchContext);
  if (typeof res === "undefined") {
    throw Error("'usePostSearch' must be used within 'PostSearchContext");
  }
  return res;
};
