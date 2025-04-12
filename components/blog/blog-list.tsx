import BlogListCard from "./blog-list-card";

import Pagination from "@/components/pagination";
import { getPostList } from "@/lib/api";

export default async function BlogList({
  searchParamsPage,
  searchParamsSize,
}: {
  searchParamsPage?: number;
  searchParamsSize?: number;
}) {
  const page = Number(searchParamsPage ?? 1);
  const size = Number(searchParamsSize ?? 10);
  const data = await getPostList(page, size);

  if (data === null) {
    return (
      <div className="mt-12 text-2xl">
        <p>服务器挂了哦, 杂鱼~</p>
      </div>
    );
  }

  const { posts, pagination } = data;

  if (!posts) {
    return (
      <div className="mt-12 text-2xl">
        <p>竟然连一篇文章都找不到</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 sm:gap-10">
        {posts.map((post) => (
          <div key={post.id}>
            <BlogListCard {...post} />
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
