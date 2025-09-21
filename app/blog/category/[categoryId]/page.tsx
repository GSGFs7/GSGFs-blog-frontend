import { notFound } from "next/navigation";

import { fc } from "@/lib/fetchClient";
import { CategoryResponse } from "@/types/posts";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: number }>;
}) {
  const { categoryId } = await params;
  let res: CategoryResponse;

  try {
    res = await fc.get<CategoryResponse>(`category/${categoryId}`);
  } catch {
    notFound();
  }

  return (
    <div>
      <p>categoryId: {categoryId}</p>
      <p>category: {res.name}</p>
      <p>这里还没有写完哦</p>
      <p>晚点再来看看吧</p>
    </div>
  );
}
