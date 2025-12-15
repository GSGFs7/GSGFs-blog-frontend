"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { LuPause, LuPlay } from "react-icons/lu";

import { ProgressBar } from "./progress-bar";
import { useMusicPlayer } from "./provider";

export function MusicPlayerServer() {
  const {
    audioRef,
    currentTrack,
    isPlaying,
    playerBackgroundColor,
    setCurrentTime,
    setCurrentTrack,
    setDuration,
    setIsLoading,
    setIsPlaying,
    setVolume,
    togglePlayPause,
  } = useMusicPlayer();

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setCurrentTrack(null);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) {
      return;
    }

    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) {
      return;
    }

    setDuration(audioRef.current.duration);
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setCurrentTrack(null);
    setDuration(0);
    setCurrentTime(0);

    toast.error("播放器遇到错误");
  };

  const handleVolumeChange = () => {
    if (!audioRef.current) {
      return;
    }

    setVolume(audioRef.current.volume);
  };

  // Sync isPlaying state with actual audio events
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  // Trigger playback when currentTrack changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Auto-play failed:", error);
          }
        });
      }
    }
  }, [currentTrack, audioRef]);

  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 flex h-12 w-56",
        "overflow-hidden border border-gray-500",
        "transition-all duration-300",
        currentTrack ? "" : "translate-y-full",
      )}
      style={{ backgroundColor: playerBackgroundColor }}
    >
      <audio
        ref={audioRef}
        controls={false}
        src={currentTrack?.src}
        onCanPlay={() => handleCanPlay()}
        onEnded={() => handleEnded()}
        onError={() => handleError()}
        onLoadStart={() => handleLoadStart()}
        onLoadedMetadata={() => handleLoadedMetadata()}
        onPause={() => handlePause()}
        onPlay={() => handlePlay()}
        onTimeUpdate={() => handleTimeUpdate()}
        onVolumeChange={() => handleVolumeChange()}
        onWaiting={() => handleWaiting()}
      />

      <div className="relative">
        {currentTrack?.coverData && (
          <Image
            fill
            alt={currentTrack?.title ?? "music cover"}
            className="absolute -z-10"
            src={
              currentTrack?.coverData
                ? `data:${currentTrack.coverMimeType};base64,${currentTrack.coverData}`
                : "/default-cover.jpg"
            }
          />
        )}

        <button
          className="mx-2 h-full w-full cursor-pointer p-2"
          type="button"
          onClick={() => togglePlayPause()}
        >
          {isPlaying ? <LuPause /> : <LuPlay />}
        </button>
      </div>

      <div className="bottom-1 flex-1 border-l border-gray-500">
        <ProgressBar />
      </div>
    </div>
  );
}
