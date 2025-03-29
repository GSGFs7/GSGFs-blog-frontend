"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React, { createContext, ReactNode, useContext, useState } from "react";

import { GalData } from "@/types/gal";

const GalContext = createContext<GalData[]>([]);

function useTable() {
  const context = useContext(GalContext);

  if (!context) {
    throw new Error("useGalTable must be used within a GalTable");
  }

  return context;
}

function Table({
  children,
  className,
  data = [],
}: {
  data?: GalData[];
  className?: string;
  children: ReactNode;
}) {
  return (
    <GalContext.Provider value={data}>
      <table className={className}>{children}</table>
    </GalContext.Provider>
  );
}

function TableHeader({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index} scope="col">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({}: { onRowClick?: (id: number) => void }) {
  const data = useTable();
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  if (!data) {
    return <p>No data to show at the moment</p>;
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
            <td>{row.vndbId}</td>
            <td>
              <div className="flex flex-col gap-1">
                <span>{row.title}</span>
                {row.title_cn ? (
                  <span className="text-sm text-gray-400">{row.title_cn}</span>
                ) : null}
              </div>
            </td>
            <td>{row.VNDBScore || "-"}</td>
            <td>{row.characterScore || "-"}</td>
            <td>{row.storyScore || "-"}</td>
            <td>{row.comprehensiveScore || "-"}</td>
            <td>{row.summary || "-"}</td>
          </tr>
        ) : (
          <React.Fragment key={row.id}>
            <tr
              aria-label={`查看 ${row.title} 剧透内容`}
              className={clsx("cursor-pointer transition-colors")}
              role="button"
              tabIndex={0}
              onClick={() => handleRowClick(row.id)}
              onKeyDown={(e) => handleKeyDown(e, row.id)}
            >
              <td>{row.vndbId}</td>
              <td>
                <div className="flex flex-col gap-1">
                  <span>{row.title}</span>
                  {row.title_cn ? (
                    <span className="text-sm text-gray-400">
                      {row.title_cn}
                    </span>
                  ) : null}
                </div>
              </td>
              <td>{row.characterScore || "-"}</td>
              <td>{row.storyScore || "-"}</td>
              <td>{row.comprehensiveScore || "-"}</td>
              <td>{row.VNDBScore || "-"}</td>
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
                    <div className="min-h-12 px-4 py-2">{row.review}</div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </React.Fragment>
        );
      })}
    </tbody>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;

export default Table;
