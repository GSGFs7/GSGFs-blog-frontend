import BlogTopCard from "./blog-top-card";

import { getAllPostIds } from "@/lib/api/post";

export default async function BlogTopCards() {
  const ids = (await getAllPostIds()) ?? [];

  return (
    <div className="mb-4 flex w-full flex-wrap gap-6 sm:h-52 md:h-80">
      <BlogTopCard postIds={ids} />
    </div>
  );
}
