import { z } from "zod";

import { siteConfig } from "@/config/site";

export interface FetchOptions extends RequestInit {
  timeout?: number;
  signal?: AbortSignal;
  // TODO: data verification
  // zod is too large (208k), do not use schema validation in client side
  schema?: z.ZodType<any>;
}

export class FetchError extends Error {
  status?: number;
  validationError?: z.ZodError;

  constructor(
    message: string,
    options?: { status?: number; validationError?: z.ZodError },
  ) {
    super(message);
    this.name = "FetchError";
    this.status = options?.status;
    this.validationError = options?.validationError;
  }
}

export async function fetchClient<T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { timeout = 5000, schema, ...fetchOptions } = options;
  let userAgent: string;
  let url: string;

  // set user agent
  if (typeof window !== "undefined") {
    userAgent = window.navigator.userAgent;
  } else {
    userAgent = `${siteConfig.siteName} NextJS/15 (+${process.env.NEXT_PUBLIC_SITE_URL})`;
  }

  // convert endpoint to URL
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    // complete URL
    url = endpoint;
  } else if (endpoint.startsWith("/")) {
    // frontend URL
    if (typeof window !== "undefined") {
      url = endpoint;
    } else {
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      url = `${baseUrl}${endpoint}`;
    }
  } else {
    // backend URL
    url = `${process.env.BACKEND_URL}/api/${endpoint}`;
  }

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": userAgent,
    ...options.headers,
  };

  // abort
  const internalController = new AbortController();
  const timeoutId = setTimeout(() => internalController.abort(), timeout);
  const userSignal = options.signal;
  const signal = userSignal
    ? composeSignal(userSignal, internalController.signal)
    : internalController.signal;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal,
    });

    clearTimeout(timeoutId);

    // report error when request failed
    if (!response.ok) {
      throw new FetchError(
        `API error ${response.status}: ${response.statusText} when ${fetchOptions.method} ${endpoint}. Message: ${await response.text()}`,
        { status: response.status },
      );
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      let data = await response.json();

      if (schema) {
        try {
          data = schema.parse(data);
        } catch (validationError) {
          // eslint-disable-next-line no-console
          console.error("API response validation error: ", validationError);

          throw new FetchError("API response validation error", {
            status: response.status,
            validationError: validationError as z.ZodError,
          });
        }
      }

      return data as T;
    } else {
      return (await response.text()) as T;
    }
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      if (!userSignal?.aborted) {
        // timeout aborted
        throw new FetchError(`Request timeout after ${timeout}ms. URL: ${url}`);
      } else {
        // user aborted
        throw new FetchError(
          `Request aborted by user(You should catch it). Reason: ${userSignal.reason}`,
        );
      }
    }

    throw new FetchError(
      error instanceof Error ? error.message : String(error),
    );
  }
}

/**
 * Enhanced version fetch API
 *
 * endpoint:
 * - if it starts with http or https, it will be used as is
 * - if it starts with /, it will use the frontend URL. such as: /api/test -> http://you-frontend.com/api/test
 * - if it starts not with /, it will use the backend URL. such as: test -> http://you-backend.com/api/test
 *
 * If use abort signal, put the signal in the options
 * such as:
 * ```ts
 * const controller = new AbortController();
 * const res = fc.get("/api/test", {
 *  signal: controller.signal,
 * });
 *
 * controller.abort();
 *
 * try {
 *  await res;
 * } catch (error) {
 * console.log(error);
 * }
 * ```
 */
export const fc = {
  get: <T = any>(endpoint: string, options?: FetchOptions) =>
    fetchClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, data?: any, options?: FetchOptions) =>
    fetchClient<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(endpoint: string, data?: any, options?: FetchOptions) =>
    fetchClient<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: FetchOptions) =>
    fetchClient<T>(endpoint, { ...options, method: "DELETE" }),

  postForm: <T = any>(
    endpoint: string,
    formData?: URLSearchParams,
    options?: FetchOptions,
  ) =>
    fetchClient<T>(endpoint, {
      ...options,
      method: "POST",
      headers: {
        ...options?.headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    }),
};

function composeSignal(...signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();

  signals.forEach((signal) => {
    // if any signal is aborted, abort the controller
    if (signal.aborted) {
      controller.abort(signal.reason);

      return;
    }

    signal.addEventListener(
      "abort",
      () => {
        controller.abort(signal.reason);
      },
      { once: true },
    );
  });

  return controller.signal;
}
