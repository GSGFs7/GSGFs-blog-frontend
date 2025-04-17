import { z } from "zod";

import { siteConfig } from "@/config/site";

export interface FetchOptions extends RequestInit {
  timeout?: number;
  schema?: z.ZodType<any>; // data verification
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

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": `${siteConfig.name} NextJS/15 (+${process.env.SITE_URL})`,
    ...options.headers,
  };

  // auto timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    let url: string;

    if (endpoint.startsWith("http") || endpoint.startsWith("https")) {
      // complete URL
      url = endpoint;
    } else if (endpoint.startsWith("/api")) {
      // frontend URL
      url = endpoint;
    } else {
      // backend URL
      url = `${process.env.BACKEND_URL}/api${endpoint}`;
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: options.signal || controller.signal,
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
      throw new FetchError(`Request timeout after ${timeout}ms`);
    }

    throw new FetchError(
      error instanceof Error ? error.message : String(error),
    );
  }
}

/**
 * Enhanced version fetch API
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
};
