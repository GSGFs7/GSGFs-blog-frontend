import { fc } from "@/lib/fetchClient";
import { GalData, GalResponse, Pagination } from "@/types";

export async function getAllGal(): Promise<{
  data: GalData[];
  pagination: Pagination;
} | null> {
  try {
    const data = await fc.get<GalResponse>("gal/gals");

    // update logic has been moved to the backend
    const gals = data.gals;

    const pagination: Pagination = {
      total: data.pagination.total,
      page: data.pagination.page,
      size: data.pagination.size,
      hasMore:
        data.pagination.page * data.pagination.size < data.pagination.total,
    };

    return { data: gals, pagination };
  } catch (e) {
    console.error("Get paginated Gal failed: ", e);

    return null;
  }
}
