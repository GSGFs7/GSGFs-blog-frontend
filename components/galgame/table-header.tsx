"use client";

import { useGalTable } from "./table";

export function GalTableHeader({
  columns,
}: {
  columns: Array<{ label: string; value: string }>;
}) {
  const { sortField, setSortField, sortDirection, setSortDirection } =
    useGalTable();

  function handleClick(value: string) {
    if (!value) return;

    if (sortField !== value) {
      setSortField(value);
    } else {
      sortDirection === "asc"
        ? setSortDirection("desc")
        : setSortDirection("asc");
    }
  }

  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index} className="group" scope="col">
            <button
              className={`w-full ${column.value ? "cursor-pointer" : ""}`}
              onClick={() => handleClick(column.value)}
            >
              <div className="flex justify-center">
                <span>{column.label}</span>
              </div>
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}
