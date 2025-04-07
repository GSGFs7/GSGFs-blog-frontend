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
    { label: "VNDB ID", value: "vndb_id" },
    { label: "title", value: "title" },
    { label: "character", value: "character_score" },
    { label: "story", value: "story_score" },
    { label: "comprehensive", value: "comprehensive_score" },
    { label: "VNDB Rating", value: "vndb_rating" },
    { label: "remark", value: "" },
  ];

  return (
    <article className="gal-table markdown-body">
      <GalTable data={data} tableColumns={tableColumns} />
    </article>
  );
}
