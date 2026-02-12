import { useEffect, useState } from "react";

import { extractAudioMetadata } from "@/lib/music";
import type { MusicMetadata } from "@/types";

export function useMusicMetadata(initialMetadata: MusicMetadata) {
  const [metadata, setMetadata] = useState<MusicMetadata>(() =>
    initialMetadata.isMetadataReady ? initialMetadata : initialMetadata,
  );

  useEffect(() => {
    if (initialMetadata.isMetadataReady) {
      return;
    }

    // This var prevents async task from attempting to
    // update the state even after the component has been destroyed.
    // It will cause error:
    //    Can't perform a React state update on an unmounted component.
    //
    // Closure trap: Excuse me?
    let isMounted = true;

    // Or, abort the task.
    const controller = new AbortController();
    extractAudioMetadata(initialMetadata.src, controller.signal)
      .then((res) => {
        if (isMounted && res.ok) {
          setMetadata(res.data);
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [initialMetadata.src, initialMetadata.isMetadataReady]);

  return metadata;
}
