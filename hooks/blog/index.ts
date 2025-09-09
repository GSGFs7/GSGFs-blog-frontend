import { RefObject } from "react";

import { useImageZoom } from "../useImageZoom";
import { useBlogAddCopyButton } from "./useBlogAddCopyButton";
import { useBlogShowCodeLanguage } from "./useBlogShowCodeLanguage";

export function useBlog(html: string, ref: RefObject<HTMLElement | null>) {
  useBlogAddCopyButton(html);
  useBlogShowCodeLanguage(html);
  useImageZoom(ref, [html]);
}
