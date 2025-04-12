"use client";

import { ChangeEvent } from "react";

import { useGalTable } from "./table";

interface sortOption {
  value: string;
  label: string;
}

export function GalTableControl() {
  const { sortField, setSortField } = useGalTable();

  const sortOptions: sortOption[] = [
    { value: "id", label: "default" },
    { value: "character_score", label: "character" },
    { value: "story_score", label: "story" },
    { value: "comprehensive_score", label: "comprehensive" },
    { value: "vndb_rating", label: "VNDB rating" },
    { value: "vndb_id", label: "VNDB ID" },
  ] as const;

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (!value) {
      setSortField("ID");
    } else {
      setSortField(value);
    }
  }

  return (
    <div className="flex w-full gap-2 rounded-2xl px-4 py-3">
      <div className="">
        <label className="px-2 text-lg" htmlFor="gal-sort-select">
          sort with:
        </label>
        <select
          className="rounded-lg border px-2 py-1"
          id="gal-sort-select"
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <option key={option.value} className="" value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {sortField}
      </div>
    </div>
  );
}
