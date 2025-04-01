import { fc } from "../fetchClient";
import { queryVN } from "../vndb";

import { GalData, GalResponse, Pagination } from "@/types";

export async function getAllGal(): Promise<{
  data: GalData[];
  pagination: Pagination;
} | null> {
  try {
    const data = await fc.get<GalResponse>("/gal/gals");

    const galPromises = (data.gals || []).map(async (gal) => {
      const res = await queryVN(gal.vndb_id);
      const vn = res;

      return {
        id: gal.id,
        vndbId: gal.vndb_id,
        title:
          gal.title ?? vn?.results[0].alttitle ?? vn?.results[0].title ?? "",
        title_cn:
          gal.title_cn ??
          vn?.results[0].titles.find((title) => title.lang === "zh-Hans")
            ?.title,
        cover: gal.cover_image ?? vn?.results[0].image.url,
        VNDBScore: gal.vndb_rating ?? vn?.results[0].rating,
        characterScore: gal.character_score,
        storyScore: gal.story_score,
        comprehensiveScore: gal.comprehensive_score,
        summary: gal.summary,
        review: gal.review,
      };
    });

    const resolvedGals = await Promise.all(galPromises);

    const gals = resolvedGals.filter(
      (gal) => gal !== null && gal !== undefined,
    );

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
