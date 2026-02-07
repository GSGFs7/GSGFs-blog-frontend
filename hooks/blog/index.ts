"use client";

import type { RefObject } from "react";

import { useImageZoom } from "@/hooks/useImageZoom";

import { useBlogAddCopyButton } from "./useBlogAddCopyButton";
import { useBlogShowCodeLanguage } from "./useBlogShowCodeLanguage";

export function useBlog(html: string, ref: RefObject<HTMLElement | null>) {
  useBlogAddCopyButton();
  useBlogShowCodeLanguage();
  useImageZoom(ref, [html]);
}
