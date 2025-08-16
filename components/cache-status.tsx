"use client";

import { testCache } from "@/app/actions";

export default function CacheStatus() {
  async function testCacheStatus() {
    console.log(await testCache());
  }

  return (
    <div>
      <button onClick={testCacheStatus}>test</button>
    </div>
  );
}
