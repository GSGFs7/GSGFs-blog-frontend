"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function Pagination({
  total,
  size,
}: {
  total: number;
  size: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageCount = Math.ceil(total / size);
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // prefetch
  useEffect(() => {
    if (currentPage > 1) {
      router.prefetch(`${pathname}?page=${currentPage - 1}`);
    }
    if (currentPage < pageCount) {
      router.prefetch(`${pathname}?page=${currentPage + 1}`);
    }
  });

  function createPageUrl(page: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    return `${pathname}?${params.toString()}`;
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < pageCount ? currentPage + 1 : pageCount;

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
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <HiChevronLeft className="text-xl" />
        </Link>
      ) : (
        <div className="flex h-full cursor-not-allowed items-center justify-center text-gray-600">
          <HiChevronLeft className="text-xl" />
        </div>
      )}
      <div className="mx-2 rounded-md border border-blue-700 px-3 py-1">
        {currentPage}
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
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
