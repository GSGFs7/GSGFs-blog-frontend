import Image from "next/image";
import Link from "next/link";

import "@/styles/blog.css";
import { Post } from "@/types";
import { formatDate } from "@/utils";

export default function BlogHeader({ post }: { post: Post }) {
  const {
    title,
    created_at: createTime,
    update_at: updateTime,
    category,
    tags,
    header_image,
  } = post;

  const default_header_image = process.env.DEFAULT_HEADER_IMAGE as string;

  // console.log(final_tags);
  // console.log(formatDate("2025-01-22T00:00:00Z"));
  // console.log(frontmatter?.date?.toISOString());

  return (
    <header className="absolute top-0 left-0 z-0 h-[30rem] w-screen overflow-hidden">
      {/* 顶部大图 */}
      <Image
        fill
        alt="Header image"
        className="object-cover"
        // 优先使用文章frontmatter中的
        src={header_image ? header_image : default_header_image}
      />

      <section
        className="absolute bottom-0 left-[20%] z-20 p-2 pb-4"
        role="article"
      >
        <h1 className="mb-6 text-left text-7xl">{title}</h1>
        <time className="pr-4" dateTime={createTime}>
          发布于: {formatDate(createTime)}
        </time>
        <time dateTime={updateTime}>更新于: {formatDate(updateTime)}</time>
        <br />
        <span className="leading-8">分类: </span>
        {category ? (
          <Link className="blog-link" href={`/blog/category/${category.id}`}>
            {category.name}
          </Link>
        ) : (
          <span>未分类</span>
        )}
        <br />
        <span>标签: </span>
        <ul className="inline-flex gap-4">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <li key={index}>
                <Link className="blog-link" href={`/blog/tag/${tag.id}`}>
                  {tag.name}
                </Link>
              </li>
            ))
          ) : (
            <span>无标签</span>
          )}
        </ul>
      </section>

      {/* 遮罩 */}
      <div className="absolute inset-0 z-10 bg-black/30" />

      <section className="main-hero-waves-area waves-area">
        <svg
          className="waves-svg"
          preserveAspectRatio="none"
          shapeRendering="auto"
          viewBox="0 24 150 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"
              id="gentle-wave"
            />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" />
            <use href="#gentle-wave" x="48" y="3" />
            <use href="#gentle-wave" x="48" y="5" />
            <use href="#gentle-wave" x="48" y="7" />
          </g>
        </svg>
      </section>
    </header>
  );
}
