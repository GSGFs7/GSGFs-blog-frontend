import Link from "./link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-wrap items-center justify-center gap-1 px-4 py-3">
      <span className="text-default-600">Powered by</span>
      <Link
        className="flex items-center text-current"
        href="https://nextjs.org/"
        rel="noopener noreferrer"
        target="_blank"
        title="nextjs homepage"
      >
        <span className="text-primary transition-colors hover:text-[#aaaaaa]">
          Next.js
        </span>
      </Link>
      <span className="text-default-600">&</span>
      <Link
        className="flex items-center text-current"
        href="https://djangoproject.com"
        rel="noopener noreferrer"
        target="_blank"
        title="django homepage"
      >
        <span className="text-primary transition-colors hover:text-[#aaaaaa]">
          Django
        </span>
      </Link>
      <span>|</span>
      <Link
        className="flex items-center text-current"
        href="https://creativecommons.org/licenses/by/4.0/deed.zh-hans"
        rel="noopener noreferrer"
        target="_blank"
        title="Creative Commons Attribution 4.0 International License"
      >
        <span className="text-primary transition-colors hover:text-[#aaaaaa]">
          CC BY 4.0
        </span>
      </Link>
      <span>|</span>
      <Link
        className="flex items-center text-current"
        href="/privacy"
        title="隐私协议"
      >
        <span className="text-primary transition-colors hover:text-[#aaaaaa]">
          privacy
        </span>
      </Link>
      <span>|</span>
      <Link
        className="flex items-center text-current"
        href="/sitemap.xml"
        title="sitemap"
      >
        <span className="text-primary transition-colors hover:text-[#aaaaaa]">
          sitemap
        </span>
      </Link>
      <span>|</span>
      <Link
        className="flex items-center text-current"
        href="/blog/feed.atom"
        title="rss feed"
      >
        <span className="text-primary transition-colors hover:text-[#aaaaaa]">
          rss
        </span>
      </Link>
    </footer>
  );
}
