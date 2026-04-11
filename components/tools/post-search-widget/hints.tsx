export function PostSearchHints() {
  return (
    <div className="pointer-events-auto mt-4 flex items-center gap-6 text-xs text-gray-500 opacity-0 sm:opacity-100">
      <p>
        全局快捷键{" "}
        <kbd className="rounded border border-gray-600 px-1 py-0.5 font-mono">
          Ctrl
        </kbd>
        {" + "}
        <kbd className="rounded border border-gray-600 px-1 py-0.5 font-mono">
          K
        </kbd>
      </p>
      <p>
        按{" "}
        <kbd className="rounded border border-gray-600 px-1 py-0.5 font-mono">
          Esc
        </kbd>{" "}
        关闭
      </p>
    </div>
  );
}
