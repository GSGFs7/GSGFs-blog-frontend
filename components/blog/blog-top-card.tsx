"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    if (postIds.length < 1) return;

    const randomIndex = Math.floor(Math.random() * postIds.length);
    const randomPostId = postIds[randomIndex];

    router.push(`/blog/post/${randomPostId}`);
  }

  return (
    <>
      <div
        className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/30 sm:flex-[9]"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute z-20 flex -translate-y-4 flex-col flex-wrap items-center justify-center gap-4 text-white">
          <h2 className="text-4xl">Blog</h2>
          <p className="max-w-lg text-center text-xl">
            <span>光标位置: </span>
            <span>{mousePosition.x.toFixed(2).padEnd(4, "0")}, </span>
            <span>{mousePosition.y.toFixed(2).padEnd(4, "0")}</span>
          </p>
        </div>
        <Image
          fill
          alt="top card image"
          className="scale-110 object-cover"
          src={cardImageL}
          style={{
            height: "100%",
            transform: `translate(${mousePosition.x * 25}px)`,
          }}
        />
        <div className="absolute z-10 h-full w-full bg-black/10" />
      </div>

      <div className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/30 bg-gray-600/15 sm:flex-[4]">
        <button
          className="relative flex h-full w-full cursor-pointer items-center justify-center"
          onClick={handleRandomPost}
        >
          <p className="absolute top-2 rounded-md px-2 py-1 text-3xl text-gray-300 transition-all">
            随机一篇
          </p>
          <Image
            alt="top card image"
            className="absolute bottom-0 translate-y-8 transition-all hover:translate-y-0"
            sizes="100vw"
            src={cardImageR}
            style={{ width: "100%", height: "auto" }}
          />
        </button>
      </div>
    </>
  );
}
