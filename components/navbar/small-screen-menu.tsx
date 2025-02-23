"use client";

import { motion } from "motion/react";

import SmallScreenLink from "./small-screen-link";

import { siteConfig } from "@/config/site";

export default function SmallScreenMenu({}: {}) {
  return (
    <motion.div
      animate={{ y: 0 }}
      className="fixed inset-0 -z-10 h-screen w-screen bg-black/15 backdrop-blur-md"
      exit={{ y: -1000 }}
      initial={{ y: -1000 }}
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
