import { Spinner } from "@heroui/react";
import { Suspense } from "react";

import BlogList from "@/components/blog/blog-list";
import BlogTopCards from "@/components/blog/blog-top-cards";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; size: string }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <BlogTopCards />

      <Suspense fallback={<Spinner size="lg" />}>
        <BlogList
          searchParamsPage={Number((await searchParams)?.page ?? 1)}
          searchParamsSize={Number((await searchParams)?.size ?? 10)}
        />
      </Suspense>
    </div>
  );
}
