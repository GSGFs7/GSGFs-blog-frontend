"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useLoading } from "@/app/providers";
import { getAllPostIds } from "@/lib/api";
import cardImageR from "@/public/0.png";
import cardImageL from "@/public/2_cut.jpg";
import { getMousePosition } from "@/utils";

export default function BlogTopCard() {
  const router = useRouter();
  const { setIsLoading: setPageIsLoading } = useLoading();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // prefetch all the post ids
  const {
    data: ids,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", "ids"],
    queryFn: async () => {
      const res = await getAllPostIds();
      if (!res.ok) {
        throw new Error(res.message);
      }
      return res.data;
    },
    staleTime: 0,
    gcTime: Infinity,
    refetchOnWindowFocus: false, // no need
    refetchOnMount: false, // no need
  });

  // State for random ID
  const [randomId, setRandomId] = useState<number | null>(null);

  // Generate random ID when data is available or pathname changes
  useEffect(() => {
    if (isLoading || !ids || ids.length === 0) {
      return;
    }

    // Use a timeout to defer the state update and avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * ids.length);
      const randomPostId = ids[randomIndex];
      setRandomId(randomPostId);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isLoading, ids]);

  // Separate effect for prefetching
  useEffect(() => {
    if (randomId) {
      router.prefetch(`/blog/${randomId}`);
    }
  }, [randomId, router]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    setMousePosition(getMousePosition(e));
  }

  async function handleRandomPost() {
    if (isLoading) {
      toast("正在加载中...");

      return;
    }

    if (error || ids === undefined || ids === null) {
      toast.error("文章列表加载失败");

      console.error(error);

      return;
    }

    if (ids.length === 0) {
      toast.error("一篇文章都没有哦");

      return;
    }

    setPageIsLoading(true);
    router.push(`/blog/${randomId}`);
  }

  return (
    <div className="flex w-full flex-wrap gap-6 sm:mb-4 sm:h-52 md:h-80">
      <div
        className="group relative flex h-52 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/30 sm:h-52 sm:flex-9 md:h-80"
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
          placeholder="blur"
          preload={true}
          src={cardImageL}
          style={{
            height: "100%",
            transform: `translate(${mousePosition.x * 25}px)`,
          }}
        />
        <div className="absolute z-10 h-full w-full bg-black/10" />
      </div>

      <div className="group relative flex h-16 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/30 sm:h-52 sm:flex-4 md:h-80">
        <button
          className="relative flex h-full w-full cursor-pointer items-center justify-center"
          type="button"
          onClick={handleRandomPost}
        >
          <p className="absolute top-2 rounded-md px-2 py-1 text-3xl text-gray-300 transition-all">
            随机一篇
          </p>
          <Image
            alt="top card image"
            className="absolute bottom-0 hidden translate-y-8 transition-all hover:translate-y-0 sm:block"
            placeholder="blur"
            preload={true}
            sizes="100vw"
            src={cardImageR}
            style={{ width: "100%", height: "auto" }}
          />
        </button>
      </div>
    </div>
  );
}
