export interface PostsCard {
  category: {
    id: number;
    name: string;
  };
  cover_image: string | null;
  created_at: string;
  id: number;
  meta_description: string | null;
  slug: string | null;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
  title: string;
  update_at: string;
}

export interface Post {
  category: {
    id: number;
    name: string;
  } | null;
  content_html: string | null;
  content: string;
  cover_image: string;
  created_at: string;
  header_image: string | null;
  id: number;
  meta_description: string;
  order: number;
  slug: string;
  status: "draft" | "published";
  tags: [{ id: number; name: string }];
  title: string;
  update_at: string;
  view_count: number;
}

export interface Render {
  author: string | null;
  category: string | null;
  content_html: string | null;
  cover_image: string | null;
  header_image: string | null;
  id: number;
  meta_description: string | null;
  slug: string | null;
  tags: string[] | null;
  title: string | null;
}

export interface PaginationType {
  total: number;
  page: number;
  size: number;
}

export interface PostIdsResponse {
  ids: number[];
}

export interface PaginationResponse {
  total: number;
  page: number;
  size: number;
}

export interface PostWithPagination {
  posts: PostsCard[];
  pagination: PaginationType;
}

export interface CategoryResponse {
  posts: PostsCard[];
  pagination: PaginationResponse;
  name: string;
}

export interface PostSitemapItem {
  id: number;
  update_at: string;
}
