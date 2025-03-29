import dynamic from "next/dynamic";

import "@/styles/gal-table.css";
import "github-markdown-css/github-markdown-dark.css";

import { getAllGal } from "@/lib/api";

const GalTable = dynamic(() => import("./table-wrap"), {
  ssr: true,
});

export default async function GalList() {
  const data = (await getAllGal())?.data;

  const tableColumns = [
    "VNDB ID",
    "title",
    "characterScore",
    "storyScore",
    "comprehensiveScore",
    "VNDBScore",
    "remark",
  ];

  return (
    <article className="markdown-body gal-table">
      <GalTable data={data} tableColumns={tableColumns} />
    </article>
  );
}
