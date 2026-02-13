/**
 * Calculate the contrast color (either white or black) based on the background color.
 * @param rgbStr The background color in "rgb(r, g, b)" format.
 * @returns "white" or "black"
 */
export function getContrastColor(rgbStr: string): "white" | "black" {
  const match = rgbStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) {
    return "white";
  }

  const r = Number.parseInt(match[1], 10);
  const g = Number.parseInt(match[2], 10);
  const b = Number.parseInt(match[3], 10);

  // YIQ formula
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}
