import clsx from "clsx";
import { useEffect, useRef } from "react";
import { LuCalendar } from "react-icons/lu";

import { formatDate } from "@/utils/formatDate";

import { usePostSearch } from "./context";

export function PostSearchResults() {
  const { results, handleResultClick, activeIndex } = usePostSearch();
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // scroll with keyboard nav
  useEffect(() => {
    if (activeIndex !== -1 && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <ul className="divide-y divide-gray-700/60">
      {results.map(({ post }, index) => (
        <li key={post.id}>
          <button
            ref={activeIndex === index ? activeItemRef : null}
            className={clsx(
              "w-full cursor-pointer px-5 py-4 text-left",
              "transition-colors duration-100",
              activeIndex === index ? "bg-gray-700" : "hover:bg-gray-700/60",
            )}
            type="button"
            onClick={() => handleResultClick(post.id)}
          >
            {/* Title */}
            <p className="mb-1 leading-snug font-semibold text-white">
              {post.title}
            </p>

            {/* Description */}
            {post.meta_description && (
              <p className="mb-2 line-clamp-2 text-sm text-gray-400">
                {post.meta_description}
              </p>
            )}

            {/* Date */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <LuCalendar className="shrink-0" />
              <time dateTime={post.created_at}>
                发布于: {formatDate(post.created_at)}
              </time>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
