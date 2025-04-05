import { fc } from "../fetchClient";
import { queryVN } from "../vndb";

import { apiUpdateGal } from "@/server";
import { GalData, GalResponse, Pagination } from "@/types";
import { getTimeDiffDays } from "@/utils";

// How many days it takes to re-fetch data from VNDB
const GAL_DATA_OUTDATED_DAYS = 7;

export async function getAllGal(): Promise<{
  data: GalData[];
  pagination: Pagination;
} | null> {
  try {
    const data = await fc.get<GalResponse>("/gal/gals");

    const galPromises = (data.gals || []).map(async (gal) => {
      const isNeedUpdate =
        getTimeDiffDays(gal.update_at) > GAL_DATA_OUTDATED_DAYS || !gal.title;
      const vn = isNeedUpdate ? await queryVN(gal.vndb_id) : null;

      const newVN = {
        id: gal.id,
        vndb_id: gal.vndb_id,
        title:
          gal.title ?? vn?.results[0].alttitle ?? vn?.results[0].title ?? "",
        title_cn:
          gal.title_cn ??
          vn?.results[0].titles.find((title) => title.lang === "zh-Hans")
            ?.title,
        cover_image: gal.cover_image ?? vn?.results[0].image.url,
        vndb_rating: gal.vndb_rating ?? vn?.results[0].rating,
        character_score: gal.character_score,
        story_score: gal.story_score,
        comprehensive_score: gal.comprehensive_score,
        summary: gal.summary,
        review: gal.review,
      } as GalData;

      if (isNeedUpdate) {
        await apiUpdateGal(newVN);
      }

      return newVN;
    });

    // concurrent
    const gals: GalData[] = await Promise.all(galPromises);

    const pagination: Pagination = {
      total: data.pagination.total,
      page: data.pagination.page,
      size: data.pagination.size,
      hasMore:
        data.pagination.page * data.pagination.size < data.pagination.total,
    };

    return { data: gals, pagination };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Get paginated Gal failed: ", e);

    return null;
  }
}
