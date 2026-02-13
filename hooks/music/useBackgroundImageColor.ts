import { useEffect, useState } from "react";

import type { MusicMetadata } from "@/types";

const DEFAULT_COLOR = "rgb(41, 39, 46)";
export const EMPTY_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export function useBackgroundImageColor(
  metadata: MusicMetadata,
  defaultColor = DEFAULT_COLOR,
) {
  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    if (!metadata.isMetadataReady) {
      return;
    }

    let isMounted = true;

    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = metadata.coverData
      ? `data:${metadata.coverMimeType};base64,${metadata.coverData}`
      : EMPTY_IMG;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r = 0;
      let g = 0;
      let b = 0;
      const step = 10;
      for (let i = 0; i < data.length; i += 4 * step) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      const pixelCount = data.length / (4 * step);
      r = Math.floor(r / pixelCount);
      g = Math.floor(g / pixelCount);
      b = Math.floor(b / pixelCount);

      const darken = 0.7;
      r = Math.floor(r * darken);
      g = Math.floor(g * darken);
      b = Math.floor(b * darken);

      if (isMounted) {
        setColor(`rgb(${r}, ${g}, ${b})`);
      }
    };

    img.onerror = () => {
      if (isMounted) {
        setColor(defaultColor);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [
    metadata.isMetadataReady,
    metadata.coverData,
    metadata.coverMimeType,
    defaultColor,
  ]);

  return color;
}
