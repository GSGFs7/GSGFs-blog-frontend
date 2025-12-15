"use client";

import { testCache } from "@/app/actions";

export default function CacheStatus() {
  async function testCacheStatus() {
    console.log(await testCache());
  }

  return (
    <div>
      <button type="button" onClick={testCacheStatus}>
        test cache
      </button>
    </div>
  );
}
