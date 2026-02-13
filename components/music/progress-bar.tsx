import clsx from "clsx";
import type React from "react";

import { formatTime } from "@/utils/format";

import { useMusicActions, useMusicTime } from "./provider";

export function ProgressBar({ isDark = true }: { isDark?: boolean }) {
  const { currentTime, duration } = useMusicTime();
  const { seekTo } = useMusicActions();
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seekTo(percent * duration);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className={clsx(
          "flex w-full items-center justify-between px-2 pt-1 text-[10px] font-medium",
          isDark ? "text-white/60" : "text-black/60",
        )}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <button
        className="group relative mt-1 h-2 w-full cursor-pointer"
        type="button"
        onClick={handleSeek}
      >
        <div
          className={clsx(
            "absolute inset-0 my-auto h-1 w-full",
            isDark ? "bg-white/10" : "bg-black/10",
          )}
        />
        <div
          className="absolute inset-y-0 left-0 my-auto h-1 bg-blue-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </button>
    </div>
  );
}
