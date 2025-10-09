"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { IoFileTrayFullSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { TbTagsFilled } from "react-icons/tb";

import { PostsCard } from "@/types";
import { formatDate } from "@/utils";

import Link from "../link";

export default function BlogListCard({
  category,
  cover_image,
  created_at,
  id,
  tags,
  title,
  content_update_at,
}: PostsCard) {
  const default_cover = "/default-cover.jpg";

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.75, 1]);

  // TODO: adapt keyboard navigating
  return (
    <motion.article
      ref={ref}
      className="group mt-4 h-64 overflow-hidden rounded-lg border border-gray-500/70 md:mt-4 md:h-72"
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
        willChange: "transform, opacity", // tell the browser in advance
      }}
    >
      <Link href={`/blog/${id}`}>
        <div className="relative z-10 h-44 w-full overflow-hidden transition-all duration-500 group-hover:scale-[1.65] md:h-56">
          <Image
            fill
            alt="postImage"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='100%25' height='100%25' fill='%23cccccc'/%3E%3C/svg%3E"
            className="scale-100 object-cover object-center"
            loading="lazy"
            placeholder="blur"
            quality={60}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={cover_image ? cover_image : default_cover}
          />
        </div>

        <h3 className="absolute z-20 translate-x-3 -translate-y-14 rounded-md bg-gray-500/30 px-4 py-1 text-white backdrop-blur-sm">
          {title}
        </h3>
        <section className="flex w-full flex-row flex-wrap px-2 py-1">
          <p className="flex items-center px-1">
            <MdDateRange />
            <span>发布于: </span>
            <time>{formatDate(created_at).split(" ").at(0)}</time>
          </p>
          <p className="flex items-center px-1">
            <MdDateRange />
            <span>更新于: </span>
            <time>{formatDate(content_update_at).split(" ").at(0)}</time>
          </p>
          <p className="flex items-center px-1">
            <IoFileTrayFullSharp />
            <span>{category?.name ?? "未分类"}</span>
          </p>
          <p className="flex flex-nowrap items-center px-1 text-nowrap">
            <TbTagsFilled />
            <span className="flex">
              {tags.length > 0
                ? tags.map((tag, index) => (
                    <span key={tag.id}>
                      {tag.name}
                      {index !== tags.length - 1 && (
                        <span className="px-1 text-gray-400">|</span>
                      )}
                    </span>
                  ))
                : "无标签"}
            </span>
          </p>
        </section>
      </Link>
    </motion.article>
  );
}
