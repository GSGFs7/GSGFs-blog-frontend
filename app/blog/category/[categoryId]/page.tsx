export const runtime = "edge";

import { CategoryResponse } from "@/types/posts";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: number }>;
}) {
  const categoryId = (await params).categoryId;
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/category/${categoryId}`,
  );
  const posts = (await res.json()) as CategoryResponse;
  // console.log(posts);

  return (
    <div>
      <p>categoryId: {categoryId}</p>
      <p>category: {posts.name}</p>
      <p>这里还没有写完哦</p>
      <p>晚点再来看看吧</p>
    </div>
  );
}
