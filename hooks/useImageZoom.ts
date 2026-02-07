"use client";

import mediumZoom from "medium-zoom";
import { type RefObject, useEffect } from "react";

export function useImageZoom(
  ref: RefObject<HTMLElement | null>,
  dependencies: any[] = [],
) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const images = ref.current.querySelectorAll<HTMLImageElement>("img");

    const zoom = mediumZoom(images, {
      background: "rgba(0,0,0,0.5)",
      margin: 0,
    });

    images.forEach((value) => {
      value.style.cursor = "zoom-in";
    });

    return () => {
      zoom.detach();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...dependencies]);
}
