"use client";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import SmallScreenMenu from "./small-screen-menu";

export default function SmallScreenButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div>
      <button
        aria-controls="small-screen-menu"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
        className="sm:hidden"
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        )}
        {/* screen reader only  */}
        <span className="sr-only">{isMenuOpen ? "关闭菜单" : "打开菜单"}</span>
      </button>

      <AnimatePresence>{isMenuOpen && <SmallScreenMenu />}</AnimatePresence>
    </div>
  );
}
