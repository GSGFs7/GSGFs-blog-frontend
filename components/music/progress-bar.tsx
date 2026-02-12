import type React from "react";

import { formatTime } from "@/utils/format";

import { useMusicPlayer } from "./provider";

export function ProgressBar() {
  const { currentTime, duration, seekTo } = useMusicPlayer();
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seekTo(percent * duration);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between p-1 text-sm">
        <span>{formatTime(currentTime)}</span>

        <span>{formatTime(duration)}</span>
      </div>

      <button
        className="relative h-full w-full grow cursor-pointer p-1"
        type="button"
        onClick={handleSeek}
      >
        <div
          className="absolute h-full w-full bg-blue-500"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute h-full w-full"
          style={{ left: `calc(${progress}) - 6px` }}
        />
      </button>
    </div>
  );
}
