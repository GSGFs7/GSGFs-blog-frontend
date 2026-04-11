"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getPostBySearch } from "@/lib/api-client";
import type { PostCardWithSimilarity } from "@/types";

import { PostSearchButton } from "./button";
import { PostSearchContext, type PostSearchInterface } from "./context";
import { PostSearchOverlay } from "./overlay";

export function PostSearchWidget() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostCardWithSimilarity[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openOverlay = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setErrorMessage("");
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === "Escape") {
        closeOverlay();
      }
      // Toggle on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          closeOverlay();
        } else {
          openOverlay();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOverlay, openOverlay, isOpen]);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSearch = useCallback(async () => {
    if (query.trim() === "") {
      return;
    }

    setIsSearching(true);
    setHasSearched(false);
    setErrorMessage("");
    setResults([]);

    const res = await getPostBySearch(query.trim());

    setIsSearching(false);
    setHasSearched(true);

    if (!res.ok) {
      setErrorMessage(res.message);
      return;
    }

    setResults(res.data.posts_with_similarity);
  }, [query]);

  const handleResultClick = useCallback(
    (postId: number) => {
      closeOverlay();
      router.push(`/blog/${postId}`);
    },
    [closeOverlay, router],
  );

  // avoid unnecessary re-render (new element create)
  const contextValue: PostSearchInterface = useMemo(() => {
    return {
      inputRef,
      hasSearched,
      setHasSearched,
      errorMessage,
      setErrorMessage,
      results,
      setResults,
      query,
      setQuery,
      isSearching,
      setIsSearching,
      openOverlay,
      closeOverlay,
      handleSearch,
      activeIndex,
      setActiveIndex,
      handleResultClick,
    };
  }, [
    activeIndex,
    closeOverlay,
    errorMessage,
    handleResultClick,
    handleSearch,
    hasSearched,
    isSearching,
    openOverlay,
    query,
    results,
  ]);

  return (
    <PostSearchContext.Provider value={contextValue}>
      {/* Trigger button */}
      <PostSearchButton openOverlay={openOverlay} />

      {/* Fullscreen overlay */}
      {isOpen && <PostSearchOverlay />}
    </PostSearchContext.Provider>
  );
}
