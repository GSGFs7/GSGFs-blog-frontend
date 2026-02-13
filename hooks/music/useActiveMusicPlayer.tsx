"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";

import {
  MusicActionsContext,
  type MusicPlayerActions,
  MusicPlayerClient,
  type MusicPlayerState,
  type MusicPlayerTime,
  MusicStateContext,
  MusicTimeContext,
} from "@/components/music";

export function useActiveMusicPlayer(
  state: MusicPlayerState,
  time: MusicPlayerTime,
  actions: MusicPlayerActions & {
    audioRef: React.RefObject<HTMLAudioElement | null>;
  },
) {
  const pathname = usePathname();
  const placeholdersRef = useRef<
    { src: string; container: HTMLDivElement; root: Root }[]
  >([]);

  const renderInRoots = (
    s: MusicPlayerState,
    t: MusicPlayerTime,
    a: MusicPlayerActions & {
      audioRef: React.RefObject<HTMLAudioElement | null>;
    },
  ) => {
    for (const item of placeholdersRef.current) {
      item.root.render(
        <MusicActionsContext.Provider value={a}>
          <MusicStateContext.Provider value={s}>
            <MusicTimeContext.Provider value={t}>
              <MusicPlayerClient
                metadata={{
                  src: item.src,
                  title: "Loading...",
                  artist: "",
                  isMetadataReady: false,
                }}
              />
            </MusicTimeContext.Provider>
          </MusicStateContext.Provider>
        </MusicActionsContext.Provider>,
      );
    }
  };

  // 1. Discovery Effect (runs on pathname change)
  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect intentionally only depends on pathname
  useEffect(() => {
    // Cleanup old roots
    const itemsToCleanup = [...placeholdersRef.current];
    for (const item of itemsToCleanup) {
      item.root.unmount();
    }
    placeholdersRef.current = [];

    const placeholders = document.querySelectorAll(".music-placeholder");
    placeholders.forEach((el) => {
      const src = el.getAttribute("src") || "";
      const container = document.createElement("div");
      el.parentElement?.replaceChild(container, el);

      const root = createRoot(container);
      placeholdersRef.current.push({ src, container, root });
    });

    // Immediately trigger a render for the new roots
    renderInRoots(state, time, actions);

    return () => {
      const itemsToCleanupOnUnmount = [...placeholdersRef.current];
      placeholdersRef.current = [];
      setTimeout(() => {
        for (const item of itemsToCleanupOnUnmount) {
          item.root.unmount();
        }
      }, 0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 2. Update Effect (runs on state or actions change - NOT time)
  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentionally exclude 'time' to avoid excessive re-renders
  useEffect(() => {
    if (placeholdersRef.current.length === 0) {
      return;
    }

    renderInRoots(state, time, actions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, actions]);
}
