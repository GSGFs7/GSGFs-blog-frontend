"use client";
// must be a client component

import { GalData } from "@/types/gal";

import Table from "./table";

import "github-markdown-css/github-markdown-dark.css";

export default function GalTable({
  data = [],
  tableColumns,
}: {
  data?: GalData[];
  tableColumns: Array<{ label: string; value: string }>;
}) {
  return (
    <>
      {/* <Table.Control /> */}
      <Table data={data}>
        <Table.Header columns={tableColumns} />
        <Table.Body />
      </Table>
    </>
  );
}
