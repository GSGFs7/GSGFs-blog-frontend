"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { TiInfoLargeOutline } from "react-icons/ti";

import IntroContent from "./intro-content";

export default function Intro({}: {}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="relative mb-6 flex w-full flex-col items-end">
      <button
        className="flex flex-row gap-2"
        onClick={() => setShow((prev) => !prev)}
      >
        <TiInfoLargeOutline />
        <span className="-translate-y-1 cursor-pointer">说明</span>
      </button>

      <AnimatePresence>
        {show ? (
          <motion.section
            key={"gal-into-content"}
            animate={{ opacity: 1, y: 0 }}
            aria-hidden={!show}
            className="w-full text-left"
            data-description="对表格中的内容进行说明"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
          >
            <IntroContent />
          </motion.section>
        ) : (
          // SEO optimization: hide the content from screen readers when not shown
          <section aria-hidden={show} className="sr-only">
            <IntroContent />
          </section>
        )}
      </AnimatePresence>
    </div>
  );
}
