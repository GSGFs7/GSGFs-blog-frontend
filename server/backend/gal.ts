"use server";

import adapter from "./adapter";

import { GalData } from "@/types";
import { fc } from "@/lib/fetchClient";

export async function apiUpdateGal(gal: GalData): Promise<() => void> {
  const updatePromise = (async () => {
    try {
      const authToken = await (await adapter()).generateAuthToken();

      return await fc.post(`/gal/${gal.id}`, gal, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`update gal error: ${e}`);
      throw e;
    }
  })();

  // Add default error handling to prevent uncaught Promise rejections
  updatePromise.catch((e) => {
    // This error handling only occurs if the caller does not use await or .catch()
    // eslint-disable-next-line no-console
    console.error(`Unhandled gal update error for ID ${gal.id}:`, e);
  });

  return updatePromise;
}
