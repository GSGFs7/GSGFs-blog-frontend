"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { LuPause, LuPlay } from "react-icons/lu";

import {
  EMPTY_IMG,
  useBackgroundImageColor,
  useMusicMetadata,
} from "@/hooks/music";
import type { MusicMetadata } from "@/types";
import { getContrastColor } from "@/utils/color";
import { formatSize, formatTime } from "@/utils/format";

import { useMusicActions, useMusicState } from "./provider";

export function MusicPlayerClient({
  metadata: initialMetadata,
}: {
  metadata: MusicMetadata;
}) {
  const { isPlaying, currentTrack } = useMusicState();
  const { play, togglePlayPause, setPlayerBackgroundColor } = useMusicActions();

  const metadata = useMusicMetadata(initialMetadata);
  const backgroundColor = useBackgroundImageColor(metadata);
  const isThisTrackActive = currentTrack?.src === metadata.src;
  const isDark = getContrastColor(backgroundColor) === "white";
  const coverUrl = metadata.coverData
    ? `data:${metadata.coverMimeType};base64,${metadata.coverData}`
    : EMPTY_IMG;

  // Update global background color when this track becomes active
  useEffect(() => {
    if (isThisTrackActive) {
      setPlayerBackgroundColor(backgroundColor);
    }
  }, [isThisTrackActive, backgroundColor, setPlayerBackgroundColor]);

  const handleClickPlay = useCallback(() => {
    if (!metadata.src) {
      toast.error("音频不存在");
      return;
    }

    if (isThisTrackActive) {
      togglePlayPause();
    } else {
      play(metadata);
    }
  }, [metadata, isThisTrackActive, togglePlayPause, play]);

  return (
    <div
      className="m-6 flex max-w-md items-center gap-4 rounded-lg p-4 shadow-lg transition-colors duration-300"
      style={{ backgroundColor }}
    >
      <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
        <Image
          fill
          alt={metadata.title ?? ""}
          className="object-cover"
          src={coverUrl}
        />

        <div
          className={clsx(
            "absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-xs transition-opacity duration-300",
            isThisTrackActive && isPlaying
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100",
          )}
        >
          <button
            className="cursor-pointer text-white drop-shadow-lg"
            type="button"
            onClick={handleClickPlay}
          >
            {isThisTrackActive && isPlaying ? (
              <LuPause size={40} />
            ) : (
              <LuPlay size={40} />
            )}
          </button>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-col gap-0.5">
          <span
            className={clsx(
              "truncate text-base font-medium",
              isDark ? "text-white" : "text-black",
            )}
          >
            {metadata.title ?? "Unknown title"}
          </span>
          <span
            className={clsx(
              "truncate text-sm",
              isDark ? "text-white/70" : "text-black/70",
            )}
          >
            {metadata.artist ?? "Unknown artist"}
          </span>
        </div>

        <div
          className={clsx(
            "flex items-center gap-2 text-xs",
            isDark ? "text-white/50" : "text-black/50",
          )}
        >
          <span>{formatTime(metadata.duration ?? 0)}</span>
          <span className="opacity-50">|</span>
          <span>{formatSize(metadata.size ?? 0)}</span>
        </div>
      </div>
    </div>
  );
}
