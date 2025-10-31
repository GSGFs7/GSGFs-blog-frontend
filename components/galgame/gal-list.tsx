"use client";

import "@/styles/blog.css";
import "@/styles/gal-table.css";
import "github-markdown-css/github-markdown-dark.css";

import { useCallback, useState } from "react";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getGals } from "@/lib/api";
import type { GalData, Pagination } from "@/types";
import { errorToString } from "@/utils/errorToString";

import GalTable from "./table-wrap";

const initPagination: Pagination = {
  page: 0,
  size: 20, // edit this, if needs to change the number in a load
  total: 0,
  hasMore: true, // don't edit this
};

// columns
const tableColumns = [
  { label: "VNDB ID", value: "vndb_id" },
  { label: "title", value: "title" },
  { label: "character", value: "character_score" },
  { label: "story", value: "story_score" },
  { label: "comprehensive", value: "comprehensive_score" },
  { label: "VNDB Rating", value: "vndb_rating" },
  { label: "remark", value: "" },
];

// TODO: sort support in backend
export default function GalList() {
  const [data, setData] = useState<GalData[]>([]);
  const [pagination, setPagination] = useState<Pagination>(initPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadMoreData = useCallback(async () => {
    if (isLoading || !pagination.hasMore) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await getGals(pagination.page + 1, pagination.size);
      if (!result.ok) {
        setErrorMessage(result.message);
        return;
      }

      setData((prev) => [...prev, ...result.data.gals]);
      setPagination(result.data.pagination);
    } catch (e) {
      console.error(e);
      setErrorMessage(errorToString(e));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, pagination]);

  const observerTarget = useInfiniteScroll(loadMoreData, pagination.hasMore);

  return (
    <>
      <article className="gal-table markdown-body w-full max-w-svw overflow-x-auto">
        <GalTable data={data} tableColumns={tableColumns} />
      </article>

      {errorMessage && (
        <div className="mt-4">
          加载时发生了一个<span className="line-through">(也可能是很多)</span>
          错误
        </div>
      )}

      {!errorMessage &&
        (pagination.hasMore ? (
          <div ref={observerTarget} className="mt-4 w-full">
            <button className="cursor-pointer" onClick={() => loadMoreData()}>
              继续滚动或点击此处以加载更多...
            </button>
          </div>
        ) : (
          <div className="mt-4 w-full select-none">
            已加载全部 {pagination.total} 条数据
          </div>
        ))}

      {!errorMessage && isLoading && <div className="spinner-big" />}
    </>
  );
}
