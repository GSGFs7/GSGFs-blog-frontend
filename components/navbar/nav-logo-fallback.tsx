import { LuLollipop } from "react-icons/lu";

import { siteConfig } from "@/config/site";

import Link from "../link";

export function NavLogoFallback() {
  return (
    <Link className="flex items-center justify-start gap-1" href="/">
      <LuLollipop className="relative -translate-y-[0.15rem] text-2xl" />
      <p className="inline-block text-lg font-bold">
        <span className="whitespace-nowrap">{siteConfig.siteName}</span>
      </p>
    </Link>
  );
}
