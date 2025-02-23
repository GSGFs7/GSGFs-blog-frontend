import clsx from "clsx";

import BlogListCard from "./blog-list-card";

import Pagination from "@/components/pagination";
import { PaginationType, PostsCard } from "@/types";

interface PostWithPagination {
  posts: PostsCard[];
  pagination: PaginationType;
}

export default async function BlogList({
  searchParamsPage,
  searchParamsSize,
}: {
  searchParamsPage?: number;
  searchParamsSize?: number;
}) {
  const page = Number(searchParamsPage ?? 1);
  const size = Number(searchParamsSize ?? 10);
  let posts: PostsCard[];
  let pagination: PaginationType;

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/posts?page=${page}&size=${size}`,
  );

  try {
    const data = (await res.json()) as PostWithPagination;
    // console.log(data)

    posts = data.posts;
    pagination = data.pagination;
  } catch {
    return <div className="mt-12 text-2xl">服务器挂了哦, 杂鱼~</div>;
  }

  if (!posts) {
    return (
      <div className="mt-12 text-2xl">
        <p>竟然连一篇文章都找不到</p>
      </div>
    );
  }

  // 先分两组
  const cols = posts.reduce(
    (acc: PostsCard[][], post: PostsCard, index: number) => {
      // 初始化两个空数组
      if (index === 0) {
        acc = [[], []];
      }

      acc[index % 2].push(post);

      return acc;
    },
    [],
  );
  // console.log(rows);

  return (
    <>
      <div
        className={clsx(
          "sm:grid sm:w-full sm:grid-cols-2 sm:flex-col sm:gap-10",
          "flex flex-col gap-4",
        )}
      >
        {cols.map((col: PostsCard[], colIndex: number) => (
          <div key={colIndex}>
            {col.map((post) => (
              <div key={post.id}>
                <BlogListCard {...post} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <Pagination size={pagination.size} total={pagination.total} />
    </>
  );

  // 原型
  // return (
  //   <div className="flex flex-col gap-10">
  //     <div className="flex gap-10">
  //       <div className="flex-1 border border-blue-500 h-64">Post1</div>
  //       <div className="flex-1 border border-red-600">Post2</div>
  //     </div>
  //     <div className="flex gap-10">
  //       <div className="flex-1 border border-blue-500 h-64">Post3</div>
  //       <div className="flex-1 border border-red-600">Post4</div>
  //     </div>
  //   </div>
  // );
}
