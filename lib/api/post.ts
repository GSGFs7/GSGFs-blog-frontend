import { getSession } from "@/lib/auth";
import { Post, PostSitemapItem, PostWithPagination } from "@/types";
import { guestLogin } from "@/types/guest";

export async function getPost(postId: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/post/${postId}`);

    return await res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return null;
  }
}

export async function getPostList(
  page: number,
  size: number,
): Promise<PostWithPagination | null> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/post/posts?page=${page}&size=${size}`,
    );
    const data = (await res.json()) as PostWithPagination;

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
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
    avatar_url: session.avatar_url!,
  };
}

export async function getAllPostIds(): Promise<number[] | null> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/post/ids`);

    return (await res.json()).ids;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`getAllPosts error: ${e}`);

    return null;
  }
}

export async function getPostSitemap(): Promise<PostSitemapItem[] | null> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/post/sitemap`);

    return await res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`getAllPosts error: ${e}`);

    return null;
  }
}
