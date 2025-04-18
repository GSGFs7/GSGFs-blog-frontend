"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useState } from "react";

import { useGalTable } from "./table";

import { markdownToHtml } from "@/utils";

export function GalTableBody() {
  const { data } = useGalTable();
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

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
        const isExpanded = !!expandedRows[row.id];

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
                        __html: markdownToHtml(row.review),
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
