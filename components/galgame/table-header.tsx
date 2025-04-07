"use client";

import { useGalTable } from "./table";

export function GalTableHeader({
  columns,
}: {
  columns: Array<{ label: string; value: string }>;
}) {
  const {} = useGalTable();

  // TODO
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index} scope="col">
            <div>
              <span>{column.label}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
