"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

// path may be '/'
const getPathId = (path: string): string => {
  return path === "/" ? "home" : path.split("/").at(1) || "";
};

export function NavItems() {
  const path = usePathname();
  const active = getPathId(path);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, left: 0, top: 0 });
  const listRef = useRef<HTMLUListElement>(null);

  // make bg can fallow the current link
  useEffect(() => {
    const currentItem = hoveredItem || active;
    const list = listRef.current;

    if (list) {
      const item = Array.from(list.children).find((children) => {
        const link = children.querySelector("a");

        return getPathId(link?.getAttribute("href") || "") === currentItem;
      }) as HTMLElement | undefined;

      if (item) {
        const rect = item.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();

        setDimensions({
          width: rect.width,
          left: rect.left - listRect.left,
          top: rect.top - listRect.top,
        });
      }
    }
  }, [hoveredItem, active]);

  return (
    <ul
      ref={listRef}
      className="relative ml-2 hidden justify-center gap-4 opacity-90 sm:flex sm:items-center"
    >
      {/* link bg */}
      <motion.div
        animate={{
          width: dimensions.width,
          left: dimensions.left,
          top: dimensions.top,
        }}
        className="absolute -z-10 rounded-lg bg-gray-500/35"
        style={{
          width: dimensions.width,
          height: "2rem",
          left: dimensions.left,
          top: dimensions.top,
          pointerEvents: "none", // Make sure mouse events are not blocked
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      {siteConfig.navItems.map((item) => {
        const itemPath = getPathId(item.href);
        const isHighlightedItem = itemPath === (hoveredItem || active);

        return (
          <li
            key={item.href}
            className={clsx(
              "relative z-10 rounded-lg px-2 py-1 transition-all",
            )}
            onMouseEnter={() => setHoveredItem(itemPath)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              className={`transition-colors duration-200 ${isHighlightedItem ? "text-outline-blue text-outline-thin text-blue-500" : ""}`}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
