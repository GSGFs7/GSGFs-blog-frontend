"use client";

import {
  createContext,
  createRef,
  type ReactNode,
  type RefObject,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { useActiveMusicPlayer } from "@/hooks/music/useActiveMusicPlayer";
import type { MusicMetadata } from "@/types";

export interface MusicPlayerContextType {
  currentTrack: MusicMetadata | null;
  isLoading: boolean;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playerBackgroundColor: string;

  setCurrentTrack: (track: MusicMetadata | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
  setPlayerBackgroundColor: (backgroundColor: string) => void;

  audioRef: RefObject<HTMLAudioElement | null>;

  play: (track: MusicMetadata) => void;
  pause: () => void;
  togglePlayPause: () => void;
  clearTrack: () => void;
  seekTo: (time: number) => void;
  changeVolume: (volume: number) => void;
}

const contextValue: MusicPlayerContextType = {
  currentTrack: null,
  isLoading: false,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  duration: 0,
  playerBackgroundColor: "rgb(41, 39, 46)",

  setCurrentTrack: (_: MusicMetadata | null) => {
    throw new Error("Not implemented yet!");
  },
  setIsLoading: (_: boolean) => {
    throw new Error("Not implemented yet!");
  },

  setIsPlaying: (_: boolean) => {
    throw new Error("Not implemented yet!");
  },
  setVolume: (_: number) => {
    throw new Error("Not implemented yet!");
  },
  setCurrentTime: (_: number) => {
    throw new Error("Not implemented yet!");
  },
  setDuration: (_: number) => {
    throw new Error("Not implemented yet!");
  },
  setPlayerBackgroundColor: (_: string) => {
    throw new Error("Not implemented yet!");
  },

  audioRef: createRef<HTMLAudioElement>(),

  play: (_: MusicMetadata) => {
    throw new Error("Not implemented yet!");
  },
  pause: () => {
    throw new Error("Not implemented yet!");
  },
  togglePlayPause: () => {
    throw new Error("Not implemented yet!");
  },
  clearTrack: () => {
    throw new Error("Not implemented yet!");
  },
  seekTo: (_: number) => {
    throw new Error("Not implemented yet!");
  },
  changeVolume: (_: number) => {
    throw new Error("Not implemented yet!");
  },
};

export const MusicPlayerContext =
  createContext<MusicPlayerContextType>(contextValue);

export const useMusicPlayer = (): MusicPlayerContextType => {
  const context = useContext(MusicPlayerContext);

  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }

  return context;
};

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<MusicMetadata | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerBackgroundColor, setPlayerBackgroundColor] =
    useState("rgb(41, 39, 46)");

  const audioRef = useRef<HTMLAudioElement>(null);

  const musicContextValue = useMemo<MusicPlayerContextType>(
    () => ({
      // state
      currentTrack,
      isLoading,
      isPlaying,
      volume,
      currentTime,
      duration,
      playerBackgroundColor,

      // set state
      setCurrentTrack,
      setIsPlaying,
      setIsLoading,
      setVolume,
      setCurrentTime,
      setDuration,
      setPlayerBackgroundColor,

      // ref
      audioRef,

      // action
      play: (track: MusicMetadata) => {
        // If it's the same track, just try to play it
        if (currentTrack?.src === track.src) {
          audioRef.current?.play().catch((err) => {
            // AbortError is expected if the user pauses quickly or switches tracks
            if (err.name !== "AbortError") {
              console.error("Playback failed:", err);
            }
          });
          return;
        }

        // If it's a new track, just set it.
        // The side effect in MusicPlayerServer (useEffect) will handle the actual play() call
        // once the audio element updates.
        setCurrentTrack(track);
        // We do NOT set isPlaying(true) here.
        // We wait for the 'play' event from the audio element.

        // Similarly for duration, we wait for 'loadedmetadata' or just set what we have from metadata
        setDuration(track.duration ?? 0);
      },
      pause: () => {
        audioRef.current?.pause();
        // isPlaying state will be updated by the 'pause' event
      },
      togglePlayPause: () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused || audio.ended) {
          audio.play().catch((err) => {
            if (err.name !== "AbortError") {
              console.error("Playback failed:", err);
            }
          });
        } else {
          audio.pause();
        }
      },
      clearTrack: () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setCurrentTrack(null);
        // Events will handle state updates, but for clearTrack we might want to force reset
        // to avoid brief flash of old state if events are slow, though usually events are fine.
        // However, since we are unmounting or clearing, playing safe:
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
      },
      seekTo: (time: number) => {
        if (audioRef.current) {
          audioRef.current.currentTime = time;
          setCurrentTime(time);
        }
      },
      changeVolume: (volume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        if (audioRef.current) {
          audioRef.current.volume = clampedVolume;
        }
        setVolume(clampedVolume);
      },
    }),
    [
      currentTime,
      currentTrack,
      duration,
      isLoading,
      isPlaying,
      volume,
      playerBackgroundColor,
    ],
  );

  useActiveMusicPlayer(musicContextValue);

  return (
    <MusicPlayerContext.Provider value={musicContextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
}
