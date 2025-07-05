type UrlSegment = string | number | null | undefined;

interface UrlOptions {
  base?: string;
  query?: Record<string, string | number | boolean | null | undefined>;
  hash?: string;
  trailingSlash?: boolean;
  lowercase?: boolean;
  separator?: string;
}

function normalizedSegment(segment: UrlSegment): string {
  if (segment === null || segment === undefined) {
    return "";
  }

  return String(segment)
    .trim()
    .replace(/^\/+|\/+$/g, "") //Remove leading and trailing slashes
    .toLowerCase();
}

function buildQueryString(query: Record<string, any>): string {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();

  return queryString;
}

export function createUrl(
  segments: UrlSegment[] | UrlSegment,
  options: UrlOptions = {},
): string {
  const {
    base = "",
    query = {},
    hash = "",
    trailingSlash = false,
    lowercase = true,
    separator = "/",
  } = options;

  let path: string = "";

  if (Array.isArray(segments)) {
    const normalizedSegments = segments
      .map((segment) => normalizedSegment(segment))
      .filter((segment) => segment.length > 0);

    path = normalizedSegments.join(separator);
  } else {
    path = normalizedSegment(segments);
  }

  // Add leading slash if there is no base URL
  if (!base && path && !path.endsWith(separator)) {
    path = separator + path;
  }

  // Handling trailing slashes
  if (trailingSlash && path && !path.endsWith(separator)) {
    path += separator;
  } else if (!trailingSlash && path.endsWith(separator)) {
    path = path.slice(0, -1);
  }

  let url = base + path;

  const queryString = buildQueryString(query);

  url += queryString;

  if (hash) {
    url += `#${hash}`;
  }

  if (lowercase) {
    url = url.toLowerCase();
  }

  return url;
}
