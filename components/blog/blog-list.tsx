import BlogListCard from "@/components/blog/blog-list-card";
import { PaginationType, PostsCard } from "@/types/posts";
import Pagination from "@/components/pagination";

export default async function BlogList({
  searchParamsPage,
  searchParamsSize,
}: {
  searchParamsPage?: number;
  searchParamsSize?: number;
}) {
  const page = Number(searchParamsPage ?? 1);
  const size = Number(searchParamsSize ?? 10);

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/posts?page=${page}&size=${size}`,
  );
  const {
    posts,
    pagination,
  }: { posts: PostsCard[]; pagination: PaginationType } = await res.json();
  // console.log(pagination);

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
      <div className="grid w-full grid-cols-2 flex-col gap-10">
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
