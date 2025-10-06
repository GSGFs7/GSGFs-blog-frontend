import dynamic from "next/dynamic";
import { Suspense } from "react";

import { BlogTopCard } from "@/components/blog";

const BlogList = dynamic(() => import("@/components/blog/blog-list"));

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  let page = params.page ?? "1";
  // let size = params.page ?? "10";

  if (page instanceof Array) {
    page = page.at(0) ?? "1";
  }
  // if (size instanceof Array) {
  //   size = size.at(0) ?? "10";
  // }

  // maybe not needs 'size'?
  const size = 10;

  return (
    <div className="flex flex-col items-center justify-center">
      <BlogTopCard />

      <Suspense fallback={<div className="spinner-big" />}>
        <BlogList searchParamsPage={page} searchParamsSize={size} />
      </Suspense>
    </div>
  );
}
