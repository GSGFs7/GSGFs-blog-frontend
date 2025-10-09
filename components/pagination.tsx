"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import { useBlogContext } from "@/app/blog/provider";

import Link from "./link";

export default function Pagination({
  page,
  total,
  size,
}: {
  page: number;
  total: number;
  size: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useBlogContext();

  const pageCount = Math.ceil(total / size);
  const currentPage = page;
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < pageCount ? currentPage + 1 : pageCount;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    return `${pathname}?${params.toString()}`;
  };

  // scroll to top
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isLoading, setIsLoading]);

  return (
    <div className="flex h-16 pt-8">
      {currentPage !== 1 ? (
        <Link
          aria-label="上一页"
          className="flex h-full cursor-pointer items-center justify-center"
          href={createPageUrl(prevPage)}
          prefetch={true}
          scroll={false}
          tabIndex={0}
          title="上一页"
          onClick={() => setIsLoading(true)}
        >
          <HiChevronLeft className="text-xl" />
        </Link>
      ) : (
        <div className="flex h-full cursor-not-allowed items-center justify-center text-gray-600">
          <HiChevronLeft className="text-xl" />
        </div>
      )}
      <div className="mx-2 rounded-md border border-blue-700 px-1 py-1">
        {isLoading ? (
          <div className="spinner-mini px-[9px]" />
        ) : (
          <span className="px-[6px]">{currentPage}</span>
        )}
      </div>
      {currentPage !== pageCount ? (
        <Link
          aria-label="下一页"
          className="flex h-full cursor-pointer items-center justify-center"
          href={createPageUrl(nextPage)}
          prefetch={true}
          scroll={false}
          tabIndex={0}
          title="下一页"
          onClick={() => setIsLoading(true)}
        >
          <HiChevronRight className="text-xl" />
        </Link>
      ) : (
        <div className="flex h-full cursor-not-allowed items-center justify-center text-gray-600">
          <HiChevronRight className="text-xl" />
        </div>
      )}
    </div>
  );
}
