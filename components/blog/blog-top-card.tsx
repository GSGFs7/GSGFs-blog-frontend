"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import cardImage1 from "@/public/0.png";
import cardImage2 from "@/public/2.jpg";

export default function BlogTopCard({ postIds }: { postIds: number[] }) {
  const router = useRouter();

  function handleRandomPost() {
    const postIndex = Math.floor(Math.random() * postIds.length);
    const postId = postIds[postIndex];

    router.push(`/blog/post/${postId}`);
  }

  return (
    <>
      <div className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/30 sm:flex-[9]">
        <div className="absolute z-20 flex -translate-y-4 flex-col flex-wrap items-center justify-center gap-4 text-white">
          <h2 className="text-4xl">Blog</h2>
          <h3 className="max-w-lg text-center text-xl">
            
          </h3>
        </div>
        <Image
          fill
          alt="top card image"
          className="object-cover"
          src={cardImage2}
          style={{ width: "100%" }}
        />
        <div className="absolute z-10 h-full w-full bg-black/10" />
      </div>

      <div className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/30 bg-black/15 sm:flex-[4]">
        <button
          className="relative flex h-full w-full cursor-pointer items-center justify-center"
          onClick={handleRandomPost}
        >
          <p className="absolute top-2 rounded-md px-2 py-1 text-3xl text-gray-300 transition-all">
            随机一篇
          </p>
          <Image
            alt="top card image"
            className="absolute bottom-0"
            sizes="100vw"
            src={cardImage1}
            style={{ width: "100%", height: "auto" }}
          />
        </button>
      </div>
    </>
  );
}
