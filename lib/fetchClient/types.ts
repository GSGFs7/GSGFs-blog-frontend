import { z } from "zod";

import { FetchError } from "./error";

export interface FetchOptions extends RequestInit {
  timeout?: number;
  signal?: AbortSignal;
  params?: Record<string, string | number | undefined | null>;
  // TODO: data verification
  // zod is too large, do not use schema validation in client side
  schema?: z.ZodType<any>;
  skipInterceptors?: boolean;
}

export interface RequestInterceptor {
  onFulfilled?: (
    url: string,
    options: FetchOptions,
  ) =>
    | Promise<{ url: string; options: FetchOptions }>
    | { url: string; options: FetchOptions };
  onRejected?: (error: any) => Promise<any> | any;
}

export interface ResponseInterceptor {
  onFulfilled?: <T>(response: T) => Promise<T> | T;
  onRejected?: (error: FetchError) => Promise<any> | any;
}
