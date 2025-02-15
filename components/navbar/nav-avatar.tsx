"use client";

import { Avatar as HerouiAvatar } from "@heroui/avatar";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NavAvatar({
  img,
  isAdmin,
  signOutAction,
}: {
  img: string | null | undefined;
  isAdmin: boolean;
  signOutAction: () => {};
}) {
  // 控制悬浮菜单
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    setIsOpen(true);
    clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div
      className="group relative flex w-9 flex-col items-center justify-center overflow-hidden"
      onPointerEnter={() => handleMouseEnter()}
      onPointerLeave={() => handleMouseLeave()}
    >
      <Link href={"/user"}>
        <HerouiAvatar size="sm" src={img ?? undefined} />
      </Link>
      {/* {isOpen && (
        <motion.div
          animate={{ y: 50, opacity: 1 }}
          className="absolute top-0 z-20 flex w-24 flex-col items-center justify-center rounded-lg border border-gray-400/20 bg-gray-700 backdrop-blur-sm transition-all"
          exit={{ y: -100, opacity: 0 }}
          initial={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.05, ease: "easeIn" }}
        >
          <ul>
            {isAdmin && (
              <li>
                <Link href={"/admin"}>admin</Link>
              </li>
            )}
          </ul>
          <li className="border-t border-gray-800">
            <button type="submit" onClick={() => signOutAction()}>
              Sign out
            </button>
          </li>
        </motion.div>
      )} */}
    </div>
  );
}
