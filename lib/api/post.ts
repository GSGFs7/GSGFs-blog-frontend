import { Post } from "@/types";

export async function getPost(postId: string): Promise<Post> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/post/${postId}`);

  return res.json();
}
