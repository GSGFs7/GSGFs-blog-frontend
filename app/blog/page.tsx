import type { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { BlogStructuredData, BlogTopCard } from "@/components/blog";
import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";
import { getPostList } from "@/lib/api-client";

import BlogProvider from "./provider";

const BlogList = dynamic(() => import("@/components/blog/blog-list"));

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// searchParams are only available in `page.js` segments!!!
export async function generateMetadata(
  { searchParams }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { page: pageParam } = await searchParams;

  let currentPage: number = 1;
  if (typeof pageParam === "string" && !Number.isNaN(Number(pageParam))) {
    currentPage = Number(pageParam);
  }

  let nextPage: number | null = null;
  let prevPage: number | null = null;
  const res = await getPostList();
  if (res.ok) {
    const total = res.data.pagination.total;
    const size = res.data.pagination.size;
    const pageCount = Math.ceil(total / size);

    prevPage = currentPage > 1 ? currentPage - 1 : null;
    nextPage = currentPage < pageCount ? currentPage + 1 : null;
  }

  return {
    title: "Blog",
    description: "博客文章页面",
    keywords: ["Blog", "编程", "日常"],
    alternates: {
      canonical: `${siteConfig.canonicalUrl}/blog?page=${currentPage}`,
    },
    pagination: {
      next: nextPage ? `${NEXT_PUBLIC_SITE_URL}/blog?page=${nextPage}` : null,
      previous: prevPage
        ? `${NEXT_PUBLIC_SITE_URL}/blog?page=${prevPage}`
        : null,
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  let page = params.page ?? "1";
  // let size = params.page ?? "10";

  if (Array.isArray(page)) {
    page = page.at(0) ?? "1";
  }
  // if (size instanceof Array) {
  //   size = size.at(0) ?? "10";
  // }

  // check is valid number
  if (Number.isNaN(Number(page))) {
    redirect("/blog?page=1");
  }

  // maybe not needs 'size'?
  const size = 10;

  return (
    <BlogProvider>
      <BlogStructuredData />

      <div className="flex flex-col items-center justify-center">
        <BlogTopCard />

        <Suspense fallback={<div className="spinner-big" />}>
          <BlogList searchParamsPage={page} searchParamsSize={size} />
        </Suspense>
      </div>
    </BlogProvider>
  );
}
