"use server";

import { createHmac } from "crypto";

import { Render } from "@/types/posts";

export async function generateAuthToken(): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000 / 100);
  const message = timestamp.toString();
  const signature = createHmac("sha256", process.env.SERVER_SECRET_KEY ?? "")
    .update(message)
    .digest("hex");

  return signature;
}

export async function postRender(render: Render) {
  fetch(`${process.env.BACKEND_URL}/api/front-server-api/render`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await generateAuthToken()}`,
    },
    body: JSON.stringify(render),
  });
}
