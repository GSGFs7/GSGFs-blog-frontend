export const runtime = "edge";

import { Suspense } from "react";

import { BlogList, BlogTopCards } from "@/components/blog";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; size: string }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <BlogTopCards />

      <Suspense>
        <BlogList
          searchParamsPage={Number((await searchParams)?.page ?? 1)}
          searchParamsSize={Number((await searchParams)?.size ?? 10)}
        />
      </Suspense>
    </div>
  );
}
