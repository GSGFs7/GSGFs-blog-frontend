import type { FetchError } from "./error";
import type {
  FetchOptions,
  RequestInterceptor,
  ResponseInterceptor,
} from "./types";

export class InterceptorManager {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);

    return () => {
      const index = this.requestInterceptors.indexOf(interceptor);
      if (index > -1) {
        this.requestInterceptors.splice(index, 1);
      }
    };
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);

    return () => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index > -1) {
        this.responseInterceptors.splice(index, 1);
      }
    };
  }

  async executeRequestInterceptors(
    url: string,
    options: FetchOptions,
  ): Promise<{ url: string; options: FetchOptions }> {
    let config = { url, options };

    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onFulfilled) {
        try {
          config = await interceptor.onFulfilled(config.url, config.options);
        } catch (error) {
          if (interceptor.onRejected) {
            await interceptor.onRejected(error);
          }
          throw error;
        }
      }
    }

    return config;
  }

  async executeResponseInterceptors<T>(
    responseOrError: T | FetchError,
    isError: boolean,
  ): Promise<T> {
    let result: any = responseOrError;

    for (const interceptor of this.responseInterceptors) {
      try {
        if (isError && interceptor.onRejected) {
          result = await interceptor.onRejected(result as FetchError);
          // if the error is handled, mark it as no longer an error
          isError = false;
        } else if (!isError && interceptor.onFulfilled) {
          result = await interceptor.onFulfilled(result);
        }
      } catch (error) {
        result = error;
        isError = true;
      }
    }

    if (isError) {
      throw result;
    }

    return result;
  }

  clear() {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }
}

export const interceptor = new InterceptorManager();
