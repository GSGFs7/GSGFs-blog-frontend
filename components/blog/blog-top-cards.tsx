import BlogTopCard from "@/components/blog/blog-top-card";
import { PostIdsResponse } from "@/types/posts";

export default async function BlogTopCards() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/posts/ids`);
  const { ids } = (await res.json()) as PostIdsResponse;

  return (
    <div className="mb-4 flex h-80 w-full flex-wrap gap-6">
      <BlogTopCard postIds={ids} />
    </div>
  );
}
