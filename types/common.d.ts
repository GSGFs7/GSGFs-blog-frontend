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

export type ApiResultSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiResultError = {
  ok: false;
  message: string;
};

export type ApiResult<T> = ApiResultSuccess<T> | ApiResultError;
