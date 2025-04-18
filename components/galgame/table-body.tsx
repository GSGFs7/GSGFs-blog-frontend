"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useState } from "react";

import { useGalTable } from "./table";

import { markdownToHtml } from "@/utils";

export function GalTableBody() {
  const { data } = useGalTable();
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [loadingRows, setLoadingRows] = useState<Record<number, boolean>>({});
  const [processedHtml, setProcessedHtml] = useState<Record<number, string>>(
    {},
  );

  const processMarkdown = async (id: number, markdown: string) => {
    if (processedHtml[id]) return;

    setLoadingRows((prev) => ({ ...prev, [id]: true }));

    try {
      if (!processedHtml[id]) {
        const html = await markdownToHtml(markdown);

        setProcessedHtml((prev) => ({
          ...prev,
          [id]: html,
        }));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`render markdown error: ${e}`);
      setProcessedHtml((prev) => ({ ...prev, [id]: markdown }));
    } finally {
      setLoadingRows((prev) => ({ ...prev, [id]: false }));
    }
  };

  useEffect(() => {
    if (!data) return;

    Object.keys(expandedRows).forEach((idStr) => {
      const id = parseInt(idStr);

      if (expandedRows[id]) {
        const row = data.find((r) => r.id === id);

        if (row?.review) {
          processMarkdown(id, row.review);
        }
      }
    });
  }, [expandedRows, data]);

  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr>
          <td>暂无数据</td>
        </tr>
      </tbody>
    );
  }

  function toggleRow(id: number) {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleRowClick(id: number) {
    toggleRow(id);
  }

  function handleKeyDown(e: React.KeyboardEvent, id: number) {
    if (e.key == "Enter" || e.key == " ") {
      toggleRow(id);
    }
  }

  return (
    <tbody>
      {data.map((row) => {
        const isLoading = !!loadingRows[row.id];
        const isExpanded = !!expandedRows[row.id];

        if (isLoading) {
          return (
            <tr key={`spinner-${row.id}`}>
              <td>
                <div className="spinner-mini" />;
              </td>
            </tr>
          );
        }

        return !row.review ? (
          <tr key={row.id}>
            <td>{row.vndb_id}</td>
            <td>
              <div className="flex flex-col gap-1">
                <span>{row.title}</span>
                {row.title_cn && row.title_cn !== row.title ? (
                  <span className="text-sm text-gray-400">{row.title_cn}</span>
                ) : null}
              </div>
            </td>
            <td>{row.character_score || "-"}</td>
            <td>{row.story_score || "-"}</td>
            <td>{row.comprehensive_score || "-"}</td>
            <td>{row.vndb_rating ? (row.vndb_rating / 10).toFixed(2) : "-"}</td>
            <td>{row.summary || "-"}</td>
          </tr>
        ) : (
          <Fragment key={row.id}>
            <tr
              aria-label={`查看 ${row.title} 剧透内容`}
              className={clsx("cursor-pointer transition-colors")}
              role="button"
              tabIndex={0}
              onClick={() => handleRowClick(row.id)}
              onKeyDown={(e) => handleKeyDown(e, row.id)}
            >
              <td>{row.vndb_id}</td>
              <td>
                <div className="flex flex-col gap-1">
                  <span>{row.title}</span>
                  {row.title_cn && row.title_cn !== row.title ? (
                    <span className="text-sm text-gray-400">
                      {row.title_cn}
                    </span>
                  ) : null}
                </div>
              </td>
              <td>{row.character_score || "-"}</td>
              <td>{row.story_score || "-"}</td>
              <td>{row.comprehensive_score || "-"}</td>
              <td>
                {row.vndb_rating ? (row.vndb_rating / 10).toFixed(2) : "-"}
              </td>
              <td>{row.summary || "-"}</td>
            </tr>

            <AnimatePresence>
              {isExpanded && (
                <motion.tr
                  animate={{ opacity: 1, height: "auto" }}
                  className={"-z-10"}
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  transition={{
                    type: "keyframes",
                    duration: 0.1,
                    ease: "easeInOut",
                  }}
                >
                  <td colSpan={Object.keys(data[0]).length}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: processedHtml[row.id],
                      }}
                      className="min-h-12 px-4 py-2"
                    />
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </Fragment>
        );
      })}
    </tbody>
  );
}
