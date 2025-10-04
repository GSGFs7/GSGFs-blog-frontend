import Link from "next/link";
import { ComponentType } from "react";
import {
  LuAccessibility,
  LuAmbulance,
  LuAperture,
  LuBugPlay,
  LuLollipop,
} from "react-icons/lu";

import { siteConfig } from "@/config/site";

export async function NavLogo() {
  const icons: ComponentType<{ className?: string }>[] = [
    LuAccessibility,
    LuAperture,
    LuAmbulance,
    LuBugPlay,
    LuLollipop,
  ];

  const SelectedIcon =
    icons[Math.floor(icons.length * Math.random())] ?? LuAccessibility;

  return (
    <Link className="flex items-center justify-start gap-1" href="/">
      <SelectedIcon className="relative -translate-y-[0.15rem] text-2xl" />
      <p className="inline-block text-lg font-bold">
        <span className="whitespace-nowrap">{siteConfig.siteName}</span>
      </p>
    </Link>
  );
}
