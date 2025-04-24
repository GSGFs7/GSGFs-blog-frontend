"use server";

import adapter from "./adapter";

// 测试用的函数 不应该在生产环境使用
export async function apiTest() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/test/auth`, {
      headers: {
        Authorization: `Bearer ${await (await adapter()).generateAuthToken()}`,
      },
    });

    // eslint-disable-next-line no-console
    console.log(await res.json());
  } catch {
    // eslint-disable-next-line no-console
    console.error("Encrypted connection establishment failed");
  }
}
