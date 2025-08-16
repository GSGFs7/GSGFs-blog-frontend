"use server";

import { generateAuthToken } from "./adapter/adapter-nodejs-runtime";

import { GalData } from "@/types";
import { fc } from "@/lib/fetchClient";

export async function apiUpdateGal(gal: GalData): Promise<() => void> {
  const updatePromise = (async () => {
    try {
      const authToken = await generateAuthToken();

      return await fc.post(`gal/${gal.id}`, gal, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (e) {
      console.error(`update gal error: ${e}`);
      throw e;
    }
  })();

  // Add default error handling to prevent uncaught Promise rejections
  updatePromise.catch((e) => {
    // This error handling only occurs if the caller does not use await or .catch()

    console.error(`Unhandled gal update error for ID ${gal.id}:`, e);
  });

  return updatePromise;
}
