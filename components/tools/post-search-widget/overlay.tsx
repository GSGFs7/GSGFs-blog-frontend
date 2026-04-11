import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  LuClock,
  LuServerCrash,
  LuTriangleAlert,
  LuWifi,
} from "react-icons/lu";

import { siteConfig } from "@/config/site";

import { usePostSearch } from "./context";
import { PostSearchHints } from "./hints";
import { PostSearchInput } from "./input";
import { PostSearchResults } from "./results";

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

export function PostSearchOverlay() {
  const {
    isSearching,
    hasSearched,
    errorMessage,
    results,
    query,
    closeOverlay,
  } = usePostSearch();

  return createPortal(
    <>
      {/* Preload loading gif */}
      <Head>
        <link
          as="image"
          href={siteConfig.postSearchingGIF}
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
          <PostSearchInput />

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Loading */}
            {isSearching && (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-gray-400">
                <Image
                  unoptimized // animated, do not optimized it
                  alt="搜索中"
                  className="h-20 w-20 object-contain"
                  height={100}
                  src={siteConfig.postSearchingGIF}
                  width={100}
                />
                <span>搜索中…</span>
              </div>
            )}

            {/* Error */}
            {!isSearching &&
              errorMessage &&
              (() => {
                const { icon, title } = getErrorDisplay(errorMessage);
                return (
                  <div className="flex flex-col items-center gap-3 py-10 text-center">
                    {icon}
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                  </div>
                );
              })()}

            {/* No results */}
            {!isSearching &&
              hasSearched &&
              !errorMessage &&
              results.length === 0 && (
                <p className="py-10 text-center text-sm text-gray-400">
                  没有找到与「{query}」相关的文章
                </p>
              )}

            {/* Results list */}
            {!isSearching && results.length > 0 && <PostSearchResults />}
          </div>
        </div>

        {/* Hints */}
        <PostSearchHints />
      </div>
    </>,
    document.body,
  );
}
