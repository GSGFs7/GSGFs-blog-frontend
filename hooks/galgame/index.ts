"use client";

import type { RefObject } from "react";

import { useImageZoom } from "@/hooks/useImageZoom";

export function useGal(
  ref: RefObject<HTMLElement | null>,
  dependencies?: any[],
) {
  useImageZoom(ref, dependencies);
}
