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
          className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          href="/"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
