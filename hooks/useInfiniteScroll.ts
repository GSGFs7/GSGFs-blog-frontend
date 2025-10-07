import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
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

  // call 'callback' function
  useEffect(() => {
    if (!isIntersecting || !hasMore) {
      return;
    }

    callback();
    setIsIntersecting(false);
  }, [isIntersecting, hasMore, callback]);

  return targetRef;
}
