"use server";

import { BACKEND_URL } from "@/env/private";

import { generateAuthToken } from "./adapter/adapter-nodejs-runtime";

// 测试用的函数 不应该在生产环境使用
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
