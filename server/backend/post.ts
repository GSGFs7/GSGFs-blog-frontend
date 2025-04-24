"use server";

import adapter from "./adapter";

import { Render } from "@/types";

export async function apiSendRender(render: Render) {
  await fetch(`${process.env.BACKEND_URL}/api/post/render`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await (await adapter()).generateAuthToken()}`,
    },
    body: JSON.stringify(render),
  });
}
