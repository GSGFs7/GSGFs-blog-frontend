"use client";

import { testCache } from "@/app/actions";

export default function CacheStatus() {
  async function testCacheStatus() {
    // eslint-disable-next-line no-console
    console.log(await testCache());
  }

  return (
    <div>
      <button onClick={testCacheStatus}>test</button>
    </div>
  );
}
