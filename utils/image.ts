/**
 * use next image optimization
 * @param src the image url
 * @param size size of image
 * @param quality quality of image
 * @returns next image url
 */
export function image(src: string, size: number, quality: number = 75): string {
  return `/_next/image?w=${size}&q=${quality}&url=${encodeURIComponent(src)}`;
}
