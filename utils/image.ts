export function image(src: string, size: number, quality: number = 75): string {
  return `/_next/image?w=${size}&q=${quality}&url=${src}`;
}
