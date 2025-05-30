import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galgame",
  description: "对我玩过的 Galgame 进行记录、介绍和推荐",
  keywords: ["Galgame", "Visual Novel", "游戏", "推荐", "记录"],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-5xl justify-center text-center">
        {children}
      </div>
    </section>
  );
}
