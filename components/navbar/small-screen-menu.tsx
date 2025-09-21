"use client";

import { motion } from "motion/react";

import { siteConfig } from "@/config/site";

import SmallScreenLink from "./small-screen-link";

export default function SmallScreenMenu() {
  return (
    <motion.div
      animate={{ y: 0 }}
      //! No blur effect in Chrome. I can't repair. Temporary use `bg-black/75`
      className="fixed inset-0 -z-10 h-screen w-screen bg-black/75 backdrop-blur-md"
      exit={{ y: -1000, opacity: 0 }}
      id="small-screen-menu"
      initial={{ y: -1000, opacity: 1 }}
      transition={{ type: "keyframes" }}
    >
      <ul className="mx-8 mt-20 flex flex-col justify-center gap-4">
        {siteConfig.navMenuItems.map((item) => (
          <li key={item.label}>
            <SmallScreenLink href={item.href} label={item.label} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
