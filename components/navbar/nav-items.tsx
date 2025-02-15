"use client";

import { NavbarItem } from "@heroui/navbar";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export function NavItems() {
  const path = usePathname();

  const active = path.split("/").at(1);
  // console.log(active);

  return (
    <ul className="ml-2 hidden justify-center gap-4 opacity-90 sm:flex sm:items-center">
      {siteConfig.navItems.map((item) => (
        <NavbarItem
          key={item.href}
          className={clsx(
            "rounded-lg transition-all data-[active=true]:bg-gray-500/30 data-[active=true]:px-2 data-[active=true]:py-1 data-[active=true]:text-blue-500",
          )}
          isActive={active === item.href.split("/").at(1)}
        >
          <NextLink
            // className={clsx(
            //   linkStyles({ color: "foreground" }),
            //   "data-[active=true]:text-blue-700 data-[active=true]:font-medium text-xl",
            // )}
            color="foreground"
            href={item.href}
          >
            {item.label}
          </NextLink>
        </NavbarItem>
      ))}
    </ul>
  );
}
