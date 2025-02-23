"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export function NavItems() {
  const path = usePathname();
  const active = path.split("/").at(1);

  return (
    <ul className="ml-2 hidden justify-center gap-4 opacity-90 sm:flex sm:items-center">
      {siteConfig.navItems.map((item) => (
        <li
          key={item.href}
          className={clsx(
            "rounded-lg transition-all",
            item.href.split("/").at(1) === active &&
              "bg-gray-500/30 px-2 py-1 text-blue-400",
          )}
        >
          <Link color="foreground" href={item.href}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
