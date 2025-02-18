import { getSession } from "@/lib/auth";
import { Post } from "@/types";
import { guestLogin } from "@/types/guest";

export async function getPost(postId: string): Promise<Post> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/post/${postId}`);

  return res.json();
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
