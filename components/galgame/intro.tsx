"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiInfoLargeOutline } from "react-icons/ti";

import AprilFoolConfirm from "./april-fool-confirm";

export default function Intro() {
  const [show, setShow] = useState<boolean>(false);
  const [showModel, setShowModel] = useState<boolean>(false);

  useEffect(() => {
    if (showModel === true) {
      setShowModel(false);
    }
  }, [showModel]);

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
        <motion.section
          key={"gal-into-content"}
          animate={{ opacity: 1, y: 0 }}
          className="text-left"
          hidden={!show}
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-2xl">说明</h2>
            <p>
              这里的内容接入了
              <Link
                className="text-blue-500 transition-all hover:text-blue-600"
                href="https://vndb.org"
                rel="noopener noreferrer"
                target="_blank"
              >
                VNDB
              </Link>
              (The Visual Novel Database), 并从中获取评分与标题之类的信息,
              对于VNDB的评分, 取10分为满分为基准(除以10).
            </p>

            <div>
              <p className="pt-4 text-xl">关于评分</p>
              <p>剧情评分以《星空鉄道とシロの旅》为基准, 满分10分.</p>
              <p>角色评分以《フレラバ ～Friend to Lover～》为基准, 满分10分.</p>
            </div>

            <div>
              <p className="pt-4 text-xl">另外,</p>
              <p>
                部分条目包含剧透内容,
                留意鼠标指针的变化(如果变化为可点击状态时则表示有隐藏内容).
              </p>
              <p>点击可展开这部分内容, 注意可能包含剧透.</p>
            </div>

            <div>
              <p className="pt-4 text-xl">愚人节彩蛋: </p>
              <button
                className="cursor-pointer text-blue-500 transition-all hover:text-blue-600"
                onClick={() => {
                  setShowModel((prev) => !prev);
                }}
              >
                click
              </button>
            </div>

            {showModel && <AprilFoolConfirm />}
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
