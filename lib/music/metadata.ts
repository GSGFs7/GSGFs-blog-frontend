import { makeTokenizer } from "@tokenizer/http";
import { parseFromTokenizer } from "music-metadata";

import type { ApiResult, MusicMetadata } from "@/types";

export async function extractAudioMetadata(
  url: string,
  abortSignal?: AbortSignal,
): Promise<ApiResult<MusicMetadata>> {
  try {
    const httpTokenizer = await makeTokenizer(url, { abortSignal });
    const { common, format } = await parseFromTokenizer(httpTokenizer);

    const picture = common.picture?.[0];

    // transfer Uint8Array to base64 string
    // if return Uint8Array, it will cause a server-client serialization error
    const coverData = picture?.data
      ? Buffer.from(picture.data).toString("base64")
      : undefined;

    const metadata: MusicMetadata = {
      title: common.title,
      artist: common.artist,
      album: common.album,
      duration: format.duration,
      size: httpTokenizer.fileInfo.size,
      coverData,
      coverMimeType: picture?.format,
      bitrate: format.bitrate,
      sampleRate: format.sampleRate,
      src: url,
      isMetadataReady: true,
    };

    return { ok: true, data: metadata };
  } catch (e) {
    console.error(e);

    return { ok: false, message: "Failed to extract metadata" };
  }
}
