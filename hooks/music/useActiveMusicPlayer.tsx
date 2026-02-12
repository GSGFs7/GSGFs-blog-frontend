"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";

import type { MusicPlayerContextType } from "@/components/music";
import { MusicPlayerClient, MusicPlayerContext } from "@/components/music";

export function useActiveMusicPlayer(contextValue: MusicPlayerContextType) {
  const pathname = usePathname();
  const placeholdersRef = useRef<
    { src: string; container: HTMLDivElement; root: Root }[]
  >([]);

  // 1. Discovery Effect (runs on pathname change)
  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect intentionally only depends on pathname to trigger cleanup and rediscovery of music placeholders on route changes. contextValue updates are handled separately by the second effect.
  useEffect(() => {
    // Cleanup old roots asynchronously to avoid sync unmount error
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
    for (const item of placeholdersRef.current) {
      item.root.render(
        <MusicPlayerContext.Provider value={contextValue}>
          <MusicPlayerClient
            metadata={{
              src: item.src,
              title: "Loading...",
              artist: "",
              isMetadataReady: false,
            }}
          />
        </MusicPlayerContext.Provider>,
      );
    }

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

  // 2. Update Effect (runs on context change)
  useEffect(() => {
    if (placeholdersRef.current.length === 0) {
      return;
    }

    for (const item of placeholdersRef.current) {
      item.root.render(
        <MusicPlayerContext.Provider value={contextValue}>
          <MusicPlayerClient
            metadata={{
              src: item.src,
              title: "Loading...",
              artist: "",
              isMetadataReady: false,
            }}
          />
        </MusicPlayerContext.Provider>,
      );
    }
  }, [contextValue]);
}
