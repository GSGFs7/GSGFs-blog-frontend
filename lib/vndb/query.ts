import { vndbVNQuery } from "@/types/vndb";

export async function queryVN(id: string): Promise<vndbVNQuery | null> {
  try {
    // https://api.vndb.org/kana#vn-fields
    const fields = [
      "alttitle",
      "title", // alttitle can be null
      "titles.lang",
      "titles.title",
      "image.url",
      "rating",
    ];

    const res = await fetch("https://api.vndb.org/kana/vn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: ["id", "=", id],
        fields: fields.join(", "),
      }),
    });

    const data: vndbVNQuery = await res.json();

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Test VNDB failed: ", e);

    return null;
  }
}
