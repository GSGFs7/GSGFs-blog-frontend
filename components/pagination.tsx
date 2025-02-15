"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
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

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    // searchParams.set() 已弃用
    const params = new URLSearchParams("page");

    params.set("page", prev.toString());

    return params.toString();
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    const params = new URLSearchParams("page");

    params.set("page", next.toString());

    return params.toString();
  }

  function handlePageChange(params: string) {
    router.push(`${pathname}?${params}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <div className="flex pt-8">
      <button
        className="text-gray-600 enabled:cursor-pointer disabled:cursor-not-allowed"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(prevPage())}
      >
        <HiChevronLeft className="text-xl" />
      </button>
      <div className="mx-2 rounded-md border border-blue-700 px-3 py-1">
        {currentPage}
      </div>
      <button
        className="text-gray-600 enabled:cursor-pointer disabled:cursor-not-allowed"
        disabled={currentPage === total}
        onClick={() => handlePageChange(nextPage())}
      >
        <HiChevronRight className="text-xl" />
      </button>
    </div>
  );
}
