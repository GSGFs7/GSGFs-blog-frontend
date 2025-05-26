import { fc } from "../fetchClient";

import { GalData, GalResponse, Pagination } from "@/types";

// How many days it takes to re-fetch data from VNDB
// const GAL_DATA_OUTDATED_DAYS = 7;

export async function getAllGal(): Promise<{
  data: GalData[];
  pagination: Pagination;
} | null> {
  try {
    const data = await fc.get<GalResponse>("/gal/gals");

    // update logic has been moved to the backend
    const galPromises = (data.gals || []).map(async (gal) => {
      // const isNeedUpdate =
      //   getTimeDiffDays(gal.update_at) > GAL_DATA_OUTDATED_DAYS || !gal.title;
      // const vn = isNeedUpdate ? await queryVN(gal.vndb_id) : null;

      const newVN = {
        id: gal.id,
        vndb_id: gal.vndb_id,
        title: gal.title ?? "",
        title_cn: gal.title_cn,
        cover_image: gal.cover_image,
        vndb_rating: gal.vndb_rating,
        character_score: gal.character_score,
        story_score: gal.story_score,
        comprehensive_score: gal.comprehensive_score,
        summary: gal.summary,
        review: gal.review,
      } as GalData;

      // if (isNeedUpdate) {
      //   // Execute in the background, don't care about the results
      //   apiUpdateGal(newVN);
      // }

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
