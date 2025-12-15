"use server";

import { extractAudioMetadata } from "@/lib/music/metadata";

import { MusicPlayerClient } from "./music-client";

/**
 * NOTE: This component must be wrapped with Suspense!
 * Otherwise it will blocking the entire page rendering.
 */
export async function MusicPlayer({ url }: { url: string }) {
  const res = await extractAudioMetadata(url);

  if (!res.ok) {
    return (
      <p className="my-2 w-fit border border-gray-500 p-2 text-sm text-gray-500">
        音乐播放器加载失败
      </p>
    );
  }

  return <MusicPlayerClient metadata={res.data} />;
}
