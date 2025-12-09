import { fc } from "@/lib/fetchClient";
import type { VndbVNQuery } from "@/types";

export async function queryVN(id: string): Promise<VndbVNQuery | null> {
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

    const data = await fc.post<VndbVNQuery>("https://api.vndb.org/kana/vn", {
      filters: ["id", "=", id],
      fields: fields.join(", "),
    });

    return data;
  } catch (e) {
    console.error("Query VNDB failed: ", e);

    return null;
  }
}
