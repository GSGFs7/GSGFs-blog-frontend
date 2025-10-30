import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(callback);
  const hasMoreRef = useRef(hasMore);

  // Update refs when props change
  useEffect(() => {
    callbackRef.current = callback;
    hasMoreRef.current = hasMore;
  }, [callback, hasMore]);

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Directly handle intersection in the observer callback
        if (entry.isIntersecting && hasMoreRef.current) {
          // run callback function
          callbackRef.current();
        }
      },
      {
        root: null, // set viewport as root
        rootMargin: "50px", // detection of 50px in advance
        threshold: 0.1, // trigger when the visible proportion of the element reaches 10%
      },
    );

    // start observe
    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    // disconnect observer
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore]);

  return targetRef;
}
