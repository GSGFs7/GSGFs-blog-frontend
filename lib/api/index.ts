export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };

export * from "./comment";
export * from "./post";
export * from "./gal";
