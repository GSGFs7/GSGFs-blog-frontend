import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center gap-1 py-3">
      <span className="text-default-600">Powered by</span>
      <Link
        className="flex items-center text-current"
        href="https://nextjs.org/"
        rel="noopener noreferrer"
        target="_blank"
        title="nextjs homepage"
      >
        <p className="text-primary hover:text-gray-400">Next.js</p>
      </Link>
      <span className="text-default-600">&</span>
      <Link
        className="flex items-center text-current"
        href="https://djangoproject.com"
        rel="noopener noreferrer"
        target="_blank"
        title="django homepage"
      >
        <p className="text-primary hover:text-gray-400">Django</p>
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
          className="text-primary transition-colors hover:text-gray-400"
          href="https://creativecommons.org/licenses/by/4.0/deed.zh-hans"
          rel="noopener noreferrer"
          target="_blank"
          title="Creative Commons Attribution 4.0 International License"
        >
          CC BY 4.0
        </Link>
      </div>
    </footer>
  );
}
