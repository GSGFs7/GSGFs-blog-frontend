"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import type { GalData } from "@/types/gal";

import { GalTableBody } from "./table-body";
import { GalTableControl } from "./table-control";
import { GalTableHeader } from "./table-header";

interface galTableContext {
  data: GalData[];
  sortField: string | null;
  sortDirection: "asc" | "desc";
  filter: string;
  setSortField: (filed: string | null) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
  setFilter: (filter: string) => void;
}

const defaultContext: galTableContext = {
  data: [],
  sortField: null,
  sortDirection: "asc",
  filter: "",
  setSortField: () => {},
  setSortDirection: () => {},
  setFilter: () => {},
};

const GalContext = createContext<galTableContext>(defaultContext);

export function useGalTable() {
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
  data: GalData[];
  className?: string;
  children: ReactNode;
}) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState("");

  // TODO
  const filteredData = data;

  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    // avoid mutation
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField as keyof GalData];
      const bValue = b[sortField as keyof GalData];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      let compareResult: number;

      // VNDB ID -> 'v' + number
      // only sort the number part
      if (sortField === "vndb_id") {
        const aNum = parseInt(String(aValue).substring(1), 10);
        const bNum = parseInt(String(bValue).substring(1), 10);

        if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
          // if parse failed
          compareResult = String(aValue).localeCompare(String(bValue));
        } else {
          compareResult = aNum - bNum;
        }
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        compareResult = aValue - bValue;
      } else {
        compareResult = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === "asc" ? compareResult : -compareResult;
    });
  }, [filteredData, sortField, sortDirection]);

  const contextValue: galTableContext = {
    data: sortedData,
    sortField,
    sortDirection,
    filter,
    setSortField,
    setSortDirection,
    setFilter,
  };

  return (
    <GalContext.Provider value={contextValue}>
      <table className={className}>{children}</table>
    </GalContext.Provider>
  );
}

Table.Control = GalTableControl;
Table.Header = GalTableHeader;
Table.Body = GalTableBody;

export default Table;
