import { Suspense } from "react";

import CacheStatus from "@/components/cache-status";
import { MusicPlayer } from "@/components/music";

export default async function Page() {
  const audioUrl =
    "https://music.gsgfs.moe/Kotoha%20-%20%E9%9B%AA%E3%81%AF%E4%BD%95%E8%89%B2.flac";

  return (
    <div>
      <p>A strange page</p>
      <CacheStatus />

      <Suspense fallback={<div className="spinner-mini m-4" />}>
        <MusicPlayer url={audioUrl} />
      </Suspense>
    </div>
  );
}
