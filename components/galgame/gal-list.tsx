import "@/styles/gal-table.css";
import "github-markdown-css/github-markdown-dark.css";
import "@/styles/blog.css";

import { getAllGal } from "@/lib/api";
import GalTable from "./table-wrap";

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
    <article
      className="gal-table markdown-body"
      style={{ overflowX: "auto", width: "100%", maxWidth: "100vw" }}
    >
      <GalTable data={data} tableColumns={tableColumns} />
    </article>
  );
}
