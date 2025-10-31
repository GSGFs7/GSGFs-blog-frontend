import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pages",
  alternates: {
    canonical: `${siteConfig.canonicalUrl}/pages`,
  },
  robots: {
    index: false, // WIP
    follow: false,
  },
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
