import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (process.env.NODE_ENV === "development") {
    return src;
  }

  const params = [`width=${width}`];

  if (quality) {
    params.push(`quality=${quality}`);
  }

  const paramsString = params.join(",");

  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
