"use server";

import { CustomMDX } from "@/components/MDX";
import type { Post } from "@/types";

import BlogClientWrapper from "./blog-client-wrapper";

export default async function BlogBodyMdx({ post }: { post: Post }) {
  return (
    <BlogClientWrapper>
      <CustomMDX source={post.content} />
    </BlogClientWrapper>
  );
}
