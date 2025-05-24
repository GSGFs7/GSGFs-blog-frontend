import { fc } from "../fetchClient";

import { vndbVNQuery } from "@/types/vndb";

export async function queryVN(id: string): Promise<vndbVNQuery | null> {
  try {
    // https://api.vndb.org/kana#vn-fields
    const fields = [
      "alttitle",
      "title", // alttitle may be null
      "titles.lang",
      "titles.title",
      "image.url",
      "rating",
    ];

    const data = await fc.post<vndbVNQuery>("https://api.vndb.org/kana/vn", {
      filters: ["id", "=", id],
      fields: fields.join(", "),
    });

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Query VNDB failed: ", e);

    return null;
  }
}
