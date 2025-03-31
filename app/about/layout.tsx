export const runtime = "edge";

import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full max-w-3xl justify-center">
        {children}
      </div>
    </section>
  );
}
