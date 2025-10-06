"use server";

import { getSession } from "@/lib/auth";
import { fc } from "@/lib/fetchClient";
import { guestLogin, IDNumber } from "@/types";
import { errorToString } from "@/utils/errorToString";

import { BackendApiFunctionResult } from ".";
import { generateAuthToken } from "./adapter/adapter-nodejs-runtime";

export async function apiGuestLogin(): Promise<
  BackendApiFunctionResult<{ id: number }>
> {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("No guest provided");
    }

    const loginDate: guestLogin = {
      name: session.name!,
      provider: session.provider!,
      provider_id: session.id!,
      avatar: session.avatar_url!,
    };

    const res = await fc.post<IDNumber>(`guest/login`, loginDate, {
      headers: {
        Authorization: `Bearer ${await generateAuthToken()}`,
      },
    });

    // console.log(await res.json());
    if (!res.id) {
      console.error(res);
      throw new Error("apiGuestLogin error");
    }

    return { ok: true, data: res };
  } catch (e) {
    console.error(e);
    return { ok: false, message: errorToString(e) };
  }
}
