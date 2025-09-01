import Link from "next/link";

// app/not-found.tsx
export const dynamic = "force-static";

export default function NotFound() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-4 text-xl">杂鱼~你要找的东西貌似不存在哦</p>
        <Link
          className="group mt-4 inline-flex items-center rounded-lg px-6 py-3 text-white transition-all duration-300 hover:text-gray-300"
          href={"/"}
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          <p className="">返回首页</p>
        </Link>
      </div>
    </div>
  );
}
