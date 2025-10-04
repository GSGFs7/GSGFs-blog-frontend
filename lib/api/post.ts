"use server";

import {
  Post,
  PostCardWithSimilarityResponse,
  PostSitemapItem,
  PostWithPagination,
} from "@/types";
import { errorToString } from "@/utils/errorToString";

import { fc, FetchError } from "../fetchClient";

import { ApiResult } from ".";

export async function getPost(
  postIdOrSlug: number | string,
): Promise<ApiResult<Post>> {
  try {
    const post = await fc.get<Post>(`post/${postIdOrSlug}`);

    return { ok: true, data: post };
  } catch (e) {
    // Too many errors
    // console.error(e);

    // return a not found code
    if (e instanceof FetchError) {
      if (e.status) {
        if (e.status === 404) {
          return { ok: false, message: "404" };
        }
      }
    }

    return { ok: false, message: errorToString(e) };
  }
}

export async function getPostList(
  page: number = 1,
  size: number = 10,
): Promise<ApiResult<PostWithPagination>> {
  try {
    const res = await fc.get<PostWithPagination>(
      `post/posts?page=${page}&size=${size}`,
    );

    return { ok: true, data: res };
  } catch (e) {
    console.error("get post list error: ", e);

    return { ok: false, message: errorToString(e) };
  }
}

export async function getAllPostIds(): Promise<ApiResult<number[]>> {
  try {
    const res = await fc.get<{ ids: number[] }>("post");

    return { ok: true, data: res.ids };
  } catch (e) {
    console.error(`getAllPosts error: ${e}`);

    return { ok: false, message: errorToString(e) };
  }
}

// TODO: refactor this
export async function getAllPostForFeed(): Promise<Post[] | null> {
  try {
    const idsResult = await getAllPostIds();
    if (!idsResult.ok) {
      return null;
    }

    const ids = idsResult.data;
    const results = await Promise.allSettled(ids.map((id) => getPost(id)));
    const posts: Post[] = results
      .filter(
        (res): res is PromiseFulfilledResult<ApiResult<Post>> =>
          res.status === "fulfilled",
      ) // keep only fulfilled promises
      .map((res) => res.value)
      .filter((res): res is { ok: true; data: Post } => res.ok === true) // keep only api success results
      .map((res) => res.data) // extract post
      .filter((post): post is Post => post !== null); // filter null

    return posts;
  } catch {
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
): Promise<ApiResult<PostCardWithSimilarityResponse>> {
  try {
    const res = await fc.get<PostCardWithSimilarityResponse>("post/search", {
      params: { q: searchString },
    });

    return { ok: true, data: res };
  } catch (e) {
    console.error(e);

    return { ok: false, message: errorToString(e) };
  }
}
