import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "分享我的想法、感受和知识",
  keywords: ["Blog", "分享", "想法", "感受", "知识"],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link as="image" href="/2_cut.jpg" rel="preload" />
      <link as="image" href="/0.png" rel="preload" />

      <div className="flex flex-col items-center justify-center gap-4 py-4 md:py-4">
        <div className="inline-block w-full max-w-5xl justify-center text-left">
          {children}
        </div>
      </div>
    </>
  );
}
