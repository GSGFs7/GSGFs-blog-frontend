"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuLollipop, LuRefreshCw } from "react-icons/lu";

import { useLoading } from "@/app/providers";
import { siteConfig } from "@/config/site";

import Link from "../link";

export function NavLogo() {
  const searchparams = useSearchParams();
  const { isLoading, setIsLoading } = useLoading();
  const [displayLoading, setDisplayLoading] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsLoading(false);
  }, [searchparams, setIsLoading]);

  // delay
  useEffect(() => {
    if (isLoading) {
      timerRef.current = setTimeout(() => setDisplayLoading(true), 200);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => setDisplayLoading(false), 100);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isLoading]);

  return (
    <Link className="flex items-center justify-start gap-1" href="/">
      {displayLoading ? (
        <LuRefreshCw
          className={clsx(
            "relative -translate-y-[0.15rem] text-2xl",
            "animate-spin",
          )}
        />
      ) : (
        <LuLollipop className="relative -translate-y-[0.15rem] text-2xl" />
      )}
      <p className="inline-block text-lg font-bold">
        <span className="whitespace-nowrap">{siteConfig.siteName}</span>
      </p>
    </Link>
  );
}
