import clsx from "clsx";
import { useEffect } from "react";
import { LuSearch, LuX } from "react-icons/lu";

import { usePostSearch } from "./context";

export function PostSearchInput() {
  const {
    inputRef,
    isSearching,
    query,
    setQuery,
    results,
    setResults,
    handleSearch,
    setErrorMessage,
    setHasSearched,
    activeIndex,
    setActiveIndex,
    handleResultClick,
  } = usePostSearch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      // -1, select none
      setActiveIndex(Math.max(activeIndex - 1, -1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(Math.min(activeIndex + 1, results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.at(activeIndex)) {
        handleResultClick(results[activeIndex].post.id);
      } else {
        void handleSearch();
      }
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: update searched status when query changed
  useEffect(() => {
    setHasSearched(false);
    setActiveIndex(-1);
  }, [query, setActiveIndex, setHasSearched]);

  return (
    <div className="flex items-center gap-2 border-b border-gray-700 px-3 py-2 md:px-4 md:py-3">
      <LuSearch className="shrink-0 text-gray-400" />
      <input
        ref={inputRef}
        className={clsx(
          // 'min-w-0': override the default 'min-width: auto' of 'flex-1'
          // prevent the search button overflow the container
          "min-w-0 flex-1 bg-transparent py-1 text-base",
          "text-white outline-none placeholder:text-gray-500",
        )}
        placeholder="搜索文章…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {query && (
        <button
          className="cursor-pointer text-gray-400 hover:text-gray-200"
          type="button"
          onClick={() => {
            setQuery("");
            setResults([]);
            setHasSearched(false);
            setErrorMessage("");
            inputRef.current?.focus();
          }}
        >
          <LuX />
        </button>
      )}

      <button
        className={clsx(
          "shrink-0 cursor-pointer whitespace-nowrap",
          "rounded-lg px-3 py-1.5 text-sm font-medium",
          "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "transition-colors duration-150",
        )}
        disabled={isSearching || query.trim() === ""}
        type="button"
        onClick={() => void handleSearch()}
      >
        搜索
      </button>
    </div>
  );
}
