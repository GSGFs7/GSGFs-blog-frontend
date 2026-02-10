import type { z } from "zod";

import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";

import { FetchError } from "./error";
import { interceptor } from "./interceptor";
import type { FetchOptions } from "./types";

export async function fetchClient<T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const {
    timeout = 5000,
    schema,
    params,
    skipInterceptors = false,
    headers: userHeaders,
    ...fetchOptions
  } = options;
  let userAgent: string;
  let url: string;

  // set user agent
  if (typeof window !== "undefined") {
    userAgent = window.navigator.userAgent;
  } else {
    userAgent = `${siteConfig.siteName} NextJS/16 (+${NEXT_PUBLIC_SITE_URL})`;
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
      throw new FetchError(
        "Cannot fetch frontend URLs on the server side. Use backend API endpoints instead.",
      );
    }
  } else {
    // backend URL (shouldn't use on client side)
    // NOTE: This is intentional, not a bug!
    // Because `BACKEND_URL` is insignificant
    // Avoid the limit of DAL(Data Access Layer)
    url = `${process.env.BACKEND_URL}/api/${endpoint}`;
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

  // Process request headers
  const headers: Record<string, string> = {
    Accept: "application/json",
    "User-Agent": userAgent,
  };
  if (userHeaders) {
    if (userHeaders instanceof Headers) {
      userHeaders.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(userHeaders)) {
      userHeaders.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, userHeaders);
    }
  }
  if (!headers["Content-Type"]) {
    // If "Content-Type" not set
    headers["Content-Type"] = "application/json";
  }

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
  const { signal, cleanupSignal } = composeSignal(
    userSignal
      ? [userSignal, internalController.signal]
      : [internalController.signal],
  );

  try {
    const response = await fetch(finalUrl, {
      ...finalOptions,
      headers: finalOptions.headers,
      signal,
    });

    cleanupSignal?.();
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
    cleanupSignal?.();
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
 *    such as: "/api/test" -> http://your-frontend.com/api/test
 * - if it starts without /, it will use the backend API URL.
 *    such as: "test" -> http://your-backend.com/api/test
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

/**
 * @deprecated
 */
function _composeSignal(signals: AbortSignal[]): {
  signal: AbortSignal;
  cleanupSignal: () => void;
} {
  const controller = new AbortController();
  const abortHandlers: Array<{ signal: AbortSignal; handler: () => void }> = [];

  signals.forEach((signal) => {
    if (signal.aborted) {
      controller.abort(signal.reason);

      return;
    }

    const abortHandler = () => {
      controller.abort(signal.reason);
    };

    signal.addEventListener("abort", abortHandler, { once: true });
    abortHandlers.push({ signal, handler: abortHandler });
  });

  const cleanupSignal = () => {
    abortHandlers.forEach(({ signal, handler }) => {
      signal.removeEventListener("abort", handler);
    });
    abortHandlers.length = 0;
  };

  return { signal: controller.signal, cleanupSignal };
}

function composeSignal(signals: AbortSignal[]): {
  signal: AbortSignal;
  cleanupSignal: () => void;
} {
  // Node 20+
  const signal = AbortSignal.any(signals);

  return { signal, cleanupSignal: () => {} };
}
