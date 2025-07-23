export class CacheError extends Error {
  public readonly operation: "get" | "set" | "delete";
  public readonly key?: string;
  public readonly originalError?: unknown;
  public readonly timestamp: Date;

  constructor(
    operation: CacheError["operation"],
    key?: string,
    originalError?: unknown,
  ) {
    super(
      `Cache operation "${operation}" failed${key ? ` for key "${key}"` : ""}${originalError ? `: ${String(originalError)}` : ""}`,
    );
    this.name = "CacheError";
    this.operation = operation;
    this.key = key;
    this.originalError = originalError;
    this.timestamp = new Date();
  }
}
