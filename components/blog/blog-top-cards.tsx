import BlogTopCard from "./blog-top-card";

import { PostIdsResponse } from "@/types";

export default async function BlogTopCards() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/posts/ids`);
  let ids: number[];

  try {
    const data = (await res.json()) as PostIdsResponse;

    ids = data.ids;
  } catch {
    ids = [];
  }

  return (
    <div className="mb-4 flex w-full flex-wrap gap-6 sm:h-52 md:h-80">
      <BlogTopCard postIds={ids} />
    </div>
  );
}
