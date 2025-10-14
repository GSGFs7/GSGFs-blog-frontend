import { z } from "zod";

export class FetchError extends Error {
  status?: number;
  validationError?: z.ZodError;
  response?: Response;

  constructor(
    message: string,
    options?: {
      status?: number;
      validationError?: z.ZodError;
      response?: Response;
    },
  ) {
    super(message);
    this.name = "FetchError";
    this.status = options?.status;
    this.validationError = options?.validationError;
    this.response = options?.response;
  }
}
