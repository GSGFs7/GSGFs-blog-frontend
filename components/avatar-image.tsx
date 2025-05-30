import clsx from "clsx";

export default function AvatarImage({
  alt = "User Avatar",
  className = "",
  size = 40,
  src,
}: {
  alt?: string;
  className?: string;
  size?: number;
  src: string;
}) {
  const allowedSizes = [
    64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
  ];
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 2 : 2;

  let optimizationImageSize = Math.max(size * dpr * 2, 64);

  optimizationImageSize =
    allowedSizes.find((s) => s >= optimizationImageSize) || 64;

  // case cloudflare image forbidden hotlink
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={clsx("rounded-full", className)}
      height={size}
      src={`/_next/image?url=${src}&w=${optimizationImageSize}&q=90`} // smallest image size is 64px
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      width={size}
    />
  );
}
