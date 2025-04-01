"use client";

import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import toast from "react-hot-toast";

import cardImageR from "@/public/0.png";
import cardImageL from "@/public/2_cut.jpg";
import { getMousePosition } from "@/utils";

export default function BlogTopCard({ postIds }: { postIds: number[] }) {
  const router = useRouter();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    setMousePosition(getMousePosition(e));
  }

  function handleRandomPost() {
    if (postIds.length < 1) {
      toast.error("出了点小问题");

      return;
    }

    const randomIndex = Math.floor(Math.random() * postIds.length);
    const randomPostId = postIds[randomIndex];

    router.push(`/blog/${randomPostId}`);
  }

  return (
    <>
      <div
        className="group sm:52 relative flex h-52 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/30 sm:flex-[9] md:h-80"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute z-20 flex -translate-y-4 flex-col flex-wrap items-center justify-center gap-4 text-white">
          <h2 className="text-4xl">Blog</h2>
          <p className="hidden max-w-lg text-center text-xl sm:block">
            <span>光标位置: </span>
            <span>{mousePosition.x.toFixed(2).padEnd(4, "0")}, </span>
            <span>{mousePosition.y.toFixed(2).padEnd(4, "0")}</span>
          </p>
        </div>
        <Image
          fill
          alt="top card image"
          className="scale-110 object-cover"
          loading="eager"
          placeholder="blur"
          src={cardImageL}
          style={{
            height: "100%",
            transform: `translate(${mousePosition.x * 25}px)`,
          }}
        />
        <div className="absolute z-10 h-full w-full bg-black/10" />
      </div>

      <div className="group relative flex h-16 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/30 sm:h-52 sm:flex-[4] md:h-80">
        <button
          className="relative flex h-full w-full cursor-pointer items-center justify-center"
          onClick={handleRandomPost}
        >
          <p className="absolute top-2 rounded-md px-2 py-1 text-3xl text-gray-300 transition-all">
            随机一篇
          </p>
          <Image
            alt="top card image"
            className="absolute bottom-0 hidden translate-y-8 transition-all hover:translate-y-0 sm:block"
            loading="eager"
            placeholder="blur"
            sizes="100vw"
            src={cardImageR}
            style={{ width: "100%", height: "auto" }}
          />
        </button>
      </div>
    </>
  );
}
