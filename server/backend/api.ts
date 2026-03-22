"use server";

import { BACKEND_URL } from "@/env/private";

import { generateAuthToken } from "./auth";

export async function apiTest() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/test/auth`, {
      headers: {
        Authorization: `Bearer ${await generateAuthToken()}`,
      },
    });

    console.log(await res.json());
  } catch {
    console.error("Encrypted connection establishment failed");
  }
}
