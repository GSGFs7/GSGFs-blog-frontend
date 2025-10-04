export type BackendApiFunctionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };

export * from "./api";
export * from "./comment";
export * from "./guest";
export * from "./status";
