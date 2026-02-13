"use client";

import {
  createContext,
  type ReactNode,
  type RefObject,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { useActiveMusicPlayer } from "@/hooks/music";
import type { MusicMetadata } from "@/types";

export interface MusicPlayerState {
  currentTrack: MusicMetadata | null;
  isLoading: boolean;
  isPlaying: boolean;
  volume: number;
  playerBackgroundColor: string;
}

export interface MusicPlayerTime {
  currentTime: number;
  duration: number;
}

export interface MusicPlayerActions {
  setCurrentTrack: (track: MusicMetadata | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
  setPlayerBackgroundColor: (backgroundColor: string) => void;
  play: (track: MusicMetadata) => void;
  pause: () => void;
  togglePlayPause: () => void;
  clearTrack: () => void;
  seekTo: (time: number) => void;
  changeVolume: (volume: number) => void;
}

export interface MusicPlayerContextType
  extends MusicPlayerState, MusicPlayerTime, MusicPlayerActions {
  audioRef: RefObject<HTMLAudioElement | null>;
}

export const MusicStateContext = createContext<MusicPlayerState | undefined>(
  undefined,
);
export const MusicTimeContext = createContext<MusicPlayerTime | undefined>(
  undefined,
);
export const MusicActionsContext = createContext<
  | (MusicPlayerActions & { audioRef: RefObject<HTMLAudioElement | null> })
  | undefined
>(undefined);

export const useMusicState = () => {
  const context = useContext(MusicStateContext);

  if (context === undefined) {
    throw new Error("useMusicState must be used within a MusicPlayerProvider");
  }

  return context;
};

export const useMusicTime = () => {
  const context = useContext(MusicTimeContext);

  if (context === undefined) {
    throw new Error("useMusicTime must be used within a MusicPlayerProvider");
  }

  return context;
};

export const useMusicActions = () => {
  const context = useContext(MusicActionsContext);

  if (context === undefined) {
    throw new Error(
      "useMusicActions must be used within a MusicPlayerProvider",
    );
  }

  return context;
};

export const useMusicPlayer = (): MusicPlayerContextType => {
  const state = useMusicState();
  const time = useMusicTime();
  const actions = useMusicActions();

  return useMemo(
    () => ({
      ...state,
      ...time,
      ...actions,
    }),
    [state, time, actions],
  );
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

  // split all of the state to 3 parts to avoid performance issues
  const state = useMemo<MusicPlayerState>(
    () => ({
      currentTrack,
      isPlaying,
      isLoading,
      volume,
      playerBackgroundColor,
    }),
    [currentTrack, isPlaying, isLoading, volume, playerBackgroundColor],
  );
  const time = useMemo<MusicPlayerTime>(
    () => ({
      currentTime,
      duration,
    }),
    [currentTime, duration],
  );
  const actions = {
    // setter
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

      setCurrentTrack(track);
      setDuration(track.duration ?? 0);
    },
    pause: () => {
      audioRef.current?.pause();
    },
    togglePlayPause: () => {
      const audio = audioRef.current;
      if (!audio) {
        return;
      }

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
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    },
    seekTo: (t: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = t;
        setCurrentTime(t);
      }
    },
    changeVolume: (v: number) => {
      const clampedVolume = Math.max(0, Math.min(1, v));
      if (audioRef.current) {
        audioRef.current.volume = clampedVolume;
      }
      setVolume(clampedVolume);
    },
  };

  useActiveMusicPlayer(state, time, actions);

  return (
    <MusicActionsContext.Provider value={actions}>
      <MusicStateContext.Provider value={state}>
        <MusicTimeContext.Provider value={time}>
          {children}
        </MusicTimeContext.Provider>
      </MusicStateContext.Provider>
    </MusicActionsContext.Provider>
  );
}
