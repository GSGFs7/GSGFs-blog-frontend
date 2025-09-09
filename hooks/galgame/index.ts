import { RefObject } from "react";

import { useImageZoom } from "../useImageZoom";

export function useGal(
  ref: RefObject<HTMLElement | null>,
  dependencies?: any[],
) {
  useImageZoom(ref, dependencies);
}
