export interface Pagination {
  total: number;
  page: number;
  size: number;
  hasMore: boolean;
}

export interface IDsNumber {
  ids: number[];
}

export interface IDNumber {
  id: number;
}

export interface MessageResponse {
  message: string;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };
