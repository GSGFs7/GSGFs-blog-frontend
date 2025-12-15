"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { LuPause, LuPlay } from "react-icons/lu";

import type { MusicMetadata } from "@/types";

import { useMusicPlayer } from "./provider";

export function MusicPlayerClient({ metadata }: { metadata: MusicMetadata }) {
  const {
    play,
    currentTrack,
    clearTrack,
    playerBackgroundColor,
    setPlayerBackgroundColor,
  } = useMusicPlayer();

  // pick a background color
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = metadata.coverData
      ? `data:${metadata.coverMimeType};base64,${metadata.coverData}`
      : "/default-cover.jpg";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r = 0;
      let g = 0;
      let b = 0;
      const step = 10;
      for (let i = 0; i < data.length; i += 4 * step) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      const pixelCount = data.length / (4 * step);
      r = Math.floor(r / pixelCount);
      g = Math.floor(g / pixelCount);
      b = Math.floor(b / pixelCount);

      const darken = 0.7;
      r = Math.floor(r * darken);
      g = Math.floor(g * darken);
      b = Math.floor(b * darken);

      setPlayerBackgroundColor(`rgb(${r}, ${g}, ${b})`);
    };
  }, [metadata, setPlayerBackgroundColor]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
  };

  const handleClickPlay = () => {
    if (!metadata.src) {
      toast.error("音频不存在");
      return;
    }

    if (!currentTrack) {
      play(metadata);
    } else if (currentTrack.src === metadata.src) {
      clearTrack();
    }
  };

  return (
    <div
      className="m-6 flex max-w-md items-center justify-center gap-4 rounded-lg p-4 shadow-lg"
      style={{ backgroundColor: playerBackgroundColor }}
    >
      <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
        <Image
          fill
          alt={metadata.title ?? ""}
          className="object-cover"
          src={
            metadata.coverData
              ? `data:${metadata.coverMimeType};base64,${metadata.coverData}`
              : "/default-cover.jpg"
          }
        />

        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs">
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => handleClickPlay()}
          >
            {currentTrack ? (
              <LuPause
                className={clsx(
                  "absolute text-white drop-shadow-md",
                  "top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2",
                )}
              />
            ) : (
              <LuPlay
                className={clsx(
                  "absolute text-white drop-shadow-md",
                  "top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2",
                )}
              />
            )}
          </button>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div
          className="mb-2 flex flex-wrap items-center justify-center gap-4"
          style={{ alignContent: "space-evenly" }}
        >
          <span className="truncate text-base font-medium text-white">
            {metadata.title ?? "Unknown title"}
          </span>
          <span className="truncate text-sm text-gray-300">
            {metadata.artist ?? "Unknown artist"}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
          <span className="">{formatTime(metadata.duration ?? 0)}</span>
          <span className="">|</span>
          <span className="">{formatSize(metadata.size ?? 0)}</span>
        </div>
      </div>
    </div>
  );
}
