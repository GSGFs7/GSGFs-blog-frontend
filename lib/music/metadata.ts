"use server";

import { makeTokenizer } from "@tokenizer/http";
import { parseFromTokenizer } from "music-metadata";

import type { ApiResult, MusicMetadata } from "@/types";

export async function extractAudioMetadata(
  url: string,
): Promise<ApiResult<MusicMetadata>> {
  try {
    const httpTokenizer = await makeTokenizer(url);

    const data = await parseFromTokenizer(httpTokenizer);

    const { common, format } = data;

    // transfer Uint8Array to base64 string
    // if return Uint8Array, it will cause a server-client serialization error
    const coverData = Buffer.from(common.picture?.[0]?.data).toString("base64");

    const metadata: MusicMetadata = {
      title: common.title,
      artist: common.artist,
      album: common.album,
      duration: format.duration,
      size: httpTokenizer.fileInfo.size,
      coverData,
      coverMimeType: common.picture?.[0]?.format,
      bitrate: format.bitrate,
      sampleRate: format.sampleRate,
      src: url,
    };

    return { ok: true, data: metadata };
  } catch (e) {
    console.error(e);

    return { ok: false, message: "Failed to extract metadata" };
  }
}
