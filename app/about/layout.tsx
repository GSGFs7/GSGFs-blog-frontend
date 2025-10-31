import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
  description: "关于页面，介绍本网站和网站的维护者",
  keywords: ["About", "关于", "介绍"],
  alternates: {
    canonical: `${siteConfig.canonicalUrl}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-fit max-w-3xl justify-center">
        {children}
      </div>
    </section>
  );
}
