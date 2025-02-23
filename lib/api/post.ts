import { getSession } from "@/lib/auth";
import { Post } from "@/types";
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

export async function getGuest(): Promise<guestLogin | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return {
    name: session.name!,
    provider: session.provider!,
    provider_id: session.id!,
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

export async function getPostSitemap(): Promise<
  { id: number; update_at: string }[] | null
> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/post/sitemap`);

    return await res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`getAllPosts error: ${e}`);

    return null;
  }
}
