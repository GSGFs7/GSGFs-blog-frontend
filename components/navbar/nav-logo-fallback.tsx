"use client";

import clsx from "clsx";
import { LuLollipop, LuRefreshCw } from "react-icons/lu";

import { useLoading } from "@/app/providers";
import { siteConfig } from "@/config/site";

import Link from "../link";

export function NavLogoFallback() {
  const { isLoading } = useLoading();

  return (
    <Link className="flex items-center justify-start gap-1" href="/">
      {isLoading ? (
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
