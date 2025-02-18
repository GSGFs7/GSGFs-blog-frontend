export interface commentType {
  id: number;
  content: string;
  author: string;
  post: string;
  created_at: string;
  update_at: string;
}

export interface newCommentType {
  content: string;
  post: string;
}
