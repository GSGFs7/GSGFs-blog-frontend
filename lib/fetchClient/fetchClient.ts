import { z } from "zod";

import { siteConfig } from "@/config/site";
import { BACKEND_URL } from "@/env/private";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";

import { FetchError } from "./error";
import { interceptor } from "./interceptor";
import { FetchOptions } from "./types";

export async function fetchClient<T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const {
    timeout = 5000,
    schema,
    params,
    skipInterceptors = false,
    ...fetchOptions
  } = options;
  let userAgent: string;
  let url: string;

  // set user agent
  if (typeof window !== "undefined") {
    userAgent = window.navigator.userAgent;
  } else {
    userAgent = `${siteConfig.siteName} NextJS/15 (+${NEXT_PUBLIC_SITE_URL})`;
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
      const baseUrl = NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      url = `${baseUrl}${endpoint}`;
    }
  } else {
    // backend URL
    url = `${BACKEND_URL}/api/${endpoint}`;
  }

  // Process URL query parameters
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value));
      }
    }

    const queryParamsString = searchParams.toString();
    if (queryParamsString) {
      url += (url.includes("?") ? "&" : "?") + queryParamsString;
    }
  }

  // TODO: maybe not JSON?
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": userAgent,
    ...options.headers,
  };

  // request interceptor
  let finalUrl = url;
  let finalOptions: FetchOptions = { ...fetchOptions, headers };
  if (!skipInterceptors) {
    try {
      const intercepted = await interceptor.executeRequestInterceptors(
        finalUrl,
        finalOptions,
      );

      finalUrl = intercepted.url;
      finalOptions = intercepted.options;
    } catch (error) {
      throw error;
    }
  }

  // abort
  const internalController = new AbortController();
  const timeoutId = setTimeout(() => internalController.abort(), timeout);
  const userSignal = options.signal;
  const signal = userSignal
    ? composeSignal(userSignal, internalController.signal)
    : internalController.signal;

  try {
    const response = await fetch(finalUrl, {
      ...finalOptions,
      headers: finalOptions.headers,
      signal,
    });

    clearTimeout(timeoutId);

    // report error when request failed
    if (!response.ok) {
      const errorText = await response.text();
      const fetchError = new FetchError(
        `API error ${response.status}: ${response.statusText} when ` +
          `${fetchOptions.method} ${finalUrl}. Response: ${errorText}`,
        { status: response.status, response },
      );

      // response interceptor, process error
      if (!skipInterceptors) {
        return await interceptor.executeResponseInterceptors<T>(
          fetchError,
          true,
        );
      }

      throw fetchError;
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      let data = await response.json();

      if (schema) {
        try {
          data = schema.parse(data);
        } catch (validationError) {
          console.error("API response validation error: ", validationError);

          throw new FetchError("API response validation error", {
            status: response.status,
            validationError: validationError as z.ZodError,
            response,
          });
        }
      }

      // response interceptor
      if (!skipInterceptors) {
        return await interceptor.executeResponseInterceptors<T>(
          data as T,
          false,
        );
      }

      return data as T;
    } else {
      const text = await response.text();

      if (!skipInterceptors) {
        return await interceptor.executeResponseInterceptors<T>(
          text as T,
          false,
        );
      }

      return text as T;
    }
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof FetchError) {
      if (!skipInterceptors) {
        return await interceptor.executeResponseInterceptors<T>(error, true);
      }

      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      let fetchError: FetchError;

      if (!userSignal?.aborted) {
        // timeout aborted
        fetchError = new FetchError(
          `Request timeout after ${timeout}ms. URL: ${finalUrl}`,
          { status: 408 },
        );
      } else {
        // user aborted
        fetchError = new FetchError(
          `Request aborted by user(You should catch it). Reason: ${userSignal.reason}`,
        );
      }

      if (!skipInterceptors) {
        return await interceptor.executeResponseInterceptors<T>(
          fetchError,
          true,
        );
      }

      throw fetchError;
    }

    // other error
    const fetchError = new FetchError(
      error instanceof Error ? error.message : String(error),
    );
    if (!skipInterceptors) {
      return await interceptor.executeResponseInterceptors<T>(fetchError, true);
    }
    throw fetchError;
  }
}

/**
 * Enhanced version fetch API
 *
 * endpoint:
 * - if it starts with http or https, it will be used as is
 * - if it starts with /, it will use the frontend URL.
 *    such as: /api/test -> http://your-frontend.com/api/test
 * - if it starts not with /, it will use the backend URL.
 *    such as: test -> http://your-backend.com/api/test
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
 *  console.log(error);
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
      body: data
        ? typeof data === "string"
          ? data
          : JSON.stringify(data)
        : undefined,
    }),

  put: <T = any>(endpoint: string, data?: any, options?: FetchOptions) =>
    fetchClient<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data
        ? typeof data === "string"
          ? data
          : JSON.stringify(data)
        : undefined,
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
