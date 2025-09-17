"use server";

import { fc } from "../fetchClient";

import { getSession } from "@/lib/auth";
import {
  guestLogin,
  Post,
  PostCardWithSimilarityResponse,
  PostSitemapItem,
  PostWithPagination,
} from "@/types";

export async function getPost(
  postIdOrSlug: number | string,
): Promise<Post | null> {
  try {
    const res = await fc.get<Post>(`post/${postIdOrSlug}`);

    return res;
  } catch (e) {
    console.error(e);

    return null;
  }
}

export async function getPostList(
  page: number = 1,
  size: number = 10,
): Promise<PostWithPagination | null> {
  try {
    const res = await fc.get<PostWithPagination>(
      `post/posts?page=${page}&size=${size}`,
    );

    return res;
  } catch (e) {
    console.error("get post list error: ", e);

    return null;
  }
}

export async function getGuest(): Promise<guestLogin | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return {
    name: session.name!,
    provider: session.provider!,
    provider_id: session.id!,
    avatar: session.avatar_url!,
  };
}

export async function getAllPostIds(): Promise<number[] | null> {
  try {
    const res = await fc.get<{ ids: number[] }>("post");

    return res.ids;
  } catch (e) {
    console.error(`getAllPosts error: ${e}`);

    return null;
  }
}

export async function getPostSitemap(): Promise<PostSitemapItem[] | null> {
  try {
    const res = await fc.get<PostSitemapItem[]>("post/sitemap");

    return res;
  } catch (e) {
    console.error(`getAllPosts error: ${e}`);

    return null;
  }
}

export async function getPostBySearch(
  searchString: string,
): Promise<PostCardWithSimilarityResponse | null> {
  try {
    const res = await fc.get<PostCardWithSimilarityResponse>("post/search", {
      params: { q: searchString },
    });

    return res;
  } catch (e) {
    console.error(e);

    return null;
  }
}
