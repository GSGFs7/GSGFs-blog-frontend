export interface CommentType {
  id: number;
  content: string;
  post_id: string;
  guest_id: string;
  guest_name: string;
  created_at: string;
  updated_at: string;
  avatar?: string;
}

export interface NewCommentType {
  content: string;
  post: string;
}

export interface AllCommentsType {
  comments: commentType[];
}
