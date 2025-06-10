"use server";

import { generateAuthToken } from "./adapter/adapter-nodejs-runtime";

import { fc } from "@/lib/fetchClient";
import { Render } from "@/types";

export async function apiSendRender(render: Render) {
  await fc.post(`post/render`, JSON.stringify(render), {
    headers: {
      Authorization: `Bearer ${await generateAuthToken()}`,
    },
  });
}
