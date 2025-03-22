import { useBlogAddCopyButton } from "./useBlogAddCopyButton";
import { useBlogShowCodeLanguage } from "./useBlogShowCodeLanguage";

export function useBlog(html: string) {
  useBlogAddCopyButton(html);
  useBlogShowCodeLanguage(html);
}
