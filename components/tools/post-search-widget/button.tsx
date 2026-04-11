import { LuSearch } from "react-icons/lu";

export function PostSearchButton({ openOverlay }: { openOverlay: () => void }) {
  return (
    <button
      aria-label="打开文章搜索"
      className="cursor-pointer rounded-full bg-blue-500/60 p-2 backdrop-blur-sm"
      type="button"
      onClick={openOverlay}
    >
      <LuSearch className="h-8 w-8" />
      <span className="sr-only">搜索文章</span>
    </button>
  );
}
