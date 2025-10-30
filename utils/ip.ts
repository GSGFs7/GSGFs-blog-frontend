export function getIP(headers: Headers) {
  return (
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for") ||
    headers.get("x-cf-connecting-ip") ||
    "unknown"
  );
}
