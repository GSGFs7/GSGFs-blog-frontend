"use server";

import { fc } from "@/lib/fetchClient";
import { GalData, GalResponse, Pagination } from "@/types";
import { errorToString } from "@/utils/errorToString";

import { ApiResult } from ".";

export async function getGals(
  page: number = 1,
  size: number = 20,
): Promise<
  ApiResult<{
    gals: GalData[];
    pagination: Pagination;
  }>
> {
  try {
    const data = await fc.get<GalResponse>("gal/gals", {
      params: { page, size },
    });

    // gal update logic has been moved to the backend

    const pagination: Pagination = {
      total: data.pagination.total,
      page: data.pagination.page,
      size: data.pagination.size,
      hasMore:
        data.pagination.page * data.pagination.size < data.pagination.total,
    };

    return { ok: true, data: { gals: data.gals, pagination } };
  } catch (e) {
    console.error("Get paginated Gal failed: ", e);

    return {
      ok: false,
      message: errorToString(e),
    };
  }
}
