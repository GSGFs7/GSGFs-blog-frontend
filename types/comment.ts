export interface commentType {
  id: number;
  content: string;
  post_id: string;
  guest_id: string;
  guest_name: string;
  created_at: string;
  update_at: string;
  avatar?: string;
}

export interface newCommentType {
  content: string;
  post: string;
}
