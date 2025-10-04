export function errorToString(error: unknown): string {
  if (error instanceof Error) {
    return `[${error.name}]: ${error.message}`;
  } else if (error === null) {
    return "null";
  } else if (typeof error === "undefined") {
    return "undefined";
  } else if (typeof error === "string") {
    return error;
  } else if (
    typeof error === "number" ||
    typeof error === "boolean" ||
    typeof error === "bigint" ||
    typeof error === "symbol"
  ) {
    return String(error);
  }

  try {
    return `Unknown error: ${JSON.stringify(error)}`;
  } catch {
    try {
      return `Unknown error: ${String(error)}`;
    } catch {
      return "Unknown error";
    }
  }
}
