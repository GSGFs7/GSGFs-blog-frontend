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
      <button className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg
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
      </button>

      <AnimatePresence>{isMenuOpen && <SmallScreenMenu />}</AnimatePresence>
    </div>
  );
}
