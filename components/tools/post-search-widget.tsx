"use client";

import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  LuCalendar,
  LuClock,
  LuSearch,
  LuServerCrash,
  LuTriangleAlert,
  LuWifi,
  LuX,
} from "react-icons/lu";

import { getPostBySearch } from "@/lib/api-client/post";
import type { PostCardWithSimilarity } from "@/types";
import { formatDate } from "@/utils/formatDate";

const LOADING_GIF_URL =
  "https://img.gsgfs.moe/img/bac2d4bb0a3b8a7829f9c5ae18d144cc.gif";

export function PostSearchWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostCardWithSimilarity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

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

  const handleSearch = async () => {
    if (query.trim() === "") {
      return;
    }

    setIsLoading(true);
    setHasSearched(false);
    setErrorMessage("");
    setResults([]);

    const res = await getPostBySearch(query.trim());

    setIsLoading(false);
    setHasSearched(true);

    if (!res.ok) {
      setErrorMessage(res.message);
      return;
    }

    setResults(res.data.posts_with_similarity);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void handleSearch();
    }
  };

  const handleResultClick = (postId: number) => {
    closeOverlay();
    router.push(`/blog/${postId}`);
  };

  const getErrorDisplay = (
    code: string,
  ): { icon: React.ReactNode; title: string } => {
    switch (code) {
      case "search_service_unavailable":
        return {
          icon: <LuServerCrash className="h-6 w-6 text-amber-400" />,
          title: "搜索服务暂不可用",
        };
      case "search_rate_limited":
        return {
          icon: <LuTriangleAlert className="h-6 w-6 text-amber-400" />,
          title: "请求过于频繁",
        };
      case "search_server_error":
        return {
          icon: <LuServerCrash className="h-6 w-6 text-red-400" />,
          title: "服务器内部错误",
        };
      case "search_client_error":
        return {
          icon: <LuTriangleAlert className="h-6 w-6 text-red-400" />,
          title: "请求参数有误",
        };
      case "search_timeout":
        return {
          icon: <LuClock className="h-6 w-6 text-amber-400" />,
          title: "搜索请求超时",
        };
      case "search_network_error":
      default:
        return {
          icon: <LuWifi className="h-6 w-6 text-red-400" />,
          title: "网络连接失败",
        };
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        aria-label="打开文章搜索"
        className="cursor-pointer rounded-full bg-blue-500/60 p-2 backdrop-blur-sm"
        type="button"
        onClick={openOverlay}
      >
        <LuSearch className="h-8 w-8" />
        <span className="sr-only">搜索文章</span>
      </button>

      {/* Fullscreen overlay */}
      {isOpen &&
        createPortal(
          <>
            {/* Preload loading gif */}
            <Head>
              <link
                as="image"
                href={LOADING_GIF_URL}
                rel="preload"
                type="image/gif"
              />
            </Head>

            {/* Backdrop */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop click-to-close pattern */}
            <div
              className="fixed inset-0 z-100 bg-gray-900/90 backdrop-blur-sm"
              onClick={() => closeOverlay()}
              onKeyDown={(e) => e.key === "Escape" && closeOverlay()}
            />

            {/* Search panel */}
            <div className="pointer-events-none fixed inset-0 z-101 flex flex-col items-center px-4 pt-24 pb-8">
              <div
                className={clsx(
                  "pointer-events-auto w-full max-w-2xl rounded-xl",
                  "border border-gray-700 bg-gray-800 shadow-2xl shadow-black",
                  "overflow-hidden",
                )}
              >
                {/* Search input */}
                <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-3">
                  <LuSearch className="shrink-0 text-gray-400" />
                  <input
                    ref={inputRef}
                    className={clsx(
                      "flex-1 bg-transparent py-1 text-base text-white outline-none",
                      "placeholder:text-gray-500",
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
                      "cursor-pointer rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium",
                      "hover:bg-blue-600 active:bg-blue-700",
                      "disabled:cursor-not-allowed disabled:opacity-60",
                      "transition-colors duration-150",
                    )}
                    disabled={isLoading || query.trim() === ""}
                    type="button"
                    onClick={() => void handleSearch()}
                  >
                    搜索
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {/* Loading */}
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center gap-4 py-10 text-gray-400">
                      <Image
                        alt="搜索中"
                        className="h-20 w-20 object-contain"
                        height={100}
                        src={LOADING_GIF_URL}
                        width={100}
                      />
                      <span>搜索中…</span>
                    </div>
                  )}

                  {/* Error */}
                  {!isLoading &&
                    errorMessage &&
                    (() => {
                      const { icon, title } = getErrorDisplay(errorMessage);
                      return (
                        <div className="flex flex-col items-center gap-3 py-10 text-center">
                          {icon}
                          <p className="text-sm font-medium text-gray-400">
                            {title}
                          </p>
                        </div>
                      );
                    })()}

                  {/* No results */}
                  {!isLoading &&
                    hasSearched &&
                    !errorMessage &&
                    results.length === 0 && (
                      <p className="py-10 text-center text-sm text-gray-400">
                        没有找到与「{query}」相关的文章
                      </p>
                    )}

                  {/* Results list */}
                  {!isLoading && results.length > 0 && (
                    <ul className="divide-y divide-gray-700/60">
                      {results.map(({ post }) => (
                        <li key={post.id}>
                          <button
                            className={clsx(
                              "w-full cursor-pointer px-5 py-4 text-left",
                              "hover:bg-gray-700/60 active:bg-gray-700",
                              "transition-colors duration-100",
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
                  )}
                </div>
              </div>

              {/* Hints */}
              <div className="pointer-events-auto mt-4 flex items-center gap-6 text-xs text-gray-500">
                <p>
                  全局快捷键{" "}
                  <kbd className="rounded border border-gray-600 px-1 py-0.5 font-mono">
                    Ctrl
                  </kbd>
                  {" + "}
                  <kbd className="rounded border border-gray-600 px-1 py-0.5 font-mono">
                    K
                  </kbd>
                </p>
                <p>
                  按{" "}
                  <kbd className="rounded border border-gray-600 px-1 py-0.5 font-mono">
                    Esc
                  </kbd>{" "}
                  关闭
                </p>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
