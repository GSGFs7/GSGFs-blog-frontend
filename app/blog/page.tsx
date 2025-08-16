import dynamic from "next/dynamic";
import { Suspense } from "react";

import { BlogTopCard } from "@/components/blog";

const BlogList = dynamic(() => import("@/components/blog/blog-list"));

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; size: string }>;
}) {
  const param = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center">
      <BlogTopCard />

      <Suspense fallback={<div className="spinner-big" />}>
        <BlogList
          searchParamsPage={Number(param?.page ?? 1)}
          searchParamsSize={Number(param?.size ?? 10)}
        />
      </Suspense>
    </div>
  );
}
