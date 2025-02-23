export interface commentType {
  id: number;
  content: string;
  author_id: string;
  post_id: string;
  created_at: string;
  update_at: string;
}

export interface newCommentType {
  content: string;
  post: string;
}
