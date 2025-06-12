/**
 * 检查是否是内部链接
 */
export function isValidRedirectUrl(url: string): boolean {
  try {
    if (url.startsWith("/")) {
      return true;
    }

    const parsedUrl = new URL(url);

    const allowedDomains = ["localhost", process.env.NEXT_PUBLIC_SITE_URL];

    return allowedDomains.some((domain) => parsedUrl.hostname === domain);
  } catch {
    return false;
  }
}
