import { Link } from "@heroui/link";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center gap-1 py-3">
      <span className="text-default-600">Powered by</span>
      <Link
        isExternal
        className="flex items-center text-current"
        href="https://nextjs.org/"
        rel="noopener noreferrer"
        title="nextjs homepage"
      >
        <p className="text-primary">Next.js</p>
      </Link>
      <span className="text-default-600">&</span>
      <Link
        isExternal
        className="flex items-center text-current"
        href="https://djangoproject.com"
        rel="noopener noreferrer"
        title="django homepage"
      >
        <p className="text-primary">Django</p>
      </Link>
      {/* <span>|</span>
      <Link
        isExternal
        className="flex items-center text-current"
        href="/sitemap"
      >
        sitemap
      </Link> */}
      <span>|</span>
      <div>
        <Link
          isExternal
          className="transition-colors"
          href="https://creativecommons.org/licenses/by/4.0/deed.zh-hans"
          rel="noopener noreferrer"
          title="Creative Commons Attribution 4.0 International License"
        >
          CC BY 4.0
        </Link>
      </div>
    </footer>
  );
}
