import "@/styles/globals.css";
import { Link } from "@heroui/link";
import { Metadata, Viewport } from "next";
import { clsx } from "clsx";

import { Providers } from "./providers";

import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { fontSans, fontMono } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "bg-background min-h-screen font-sans antialiased",
          fontMono.variable,
          fontSans.variable,
        )}
      >
        {/* 客户端组件 */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative z-10 flex h-screen w-screen flex-col items-center">
            <header
              className="fixed z-40 flex w-full justify-center pb-10"
              role="banner"
            >
              <Navbar />
            </header>

            <main className="dark container mx-auto max-w-7xl grow px-6 pt-24">
              {/* 虽然在客户端组件之下 但是写在服务端组件内 依旧是服务端组件 */}
              {children}
            </main>

            <footer className="flex w-full items-center justify-center gap-1 py-3">
              <span className="text-default-600">Powered by</span>
              <Link
                isExternal
                className="flex items-center text-current"
                href="https://nextjs.org/"
                title="nextjs homepage"
              >
                <p className="text-primary">Next.js</p>
              </Link>
              <span className="text-default-600">&</span>
              <Link
                isExternal
                className="flex items-center text-current"
                href="https://djangoproject.com"
                title="django homepage"
              >
                <p className="text-primary">Django</p>
              </Link>
            </footer>

            {/* 背景色 */}
          </div>
          <div
            aria-hidden="true"
            className="fixed top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full bg-[#ffa6a9]/10 blur-[10rem] sm:w-[68.75rem]"
          />
          <div
            aria-hidden="true"
            className="fixed top-[-1rem] left-[-35rem] h-[41.25rem] w-[50rem] rounded-full bg-[#ada2ff]/10 blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"
          />
        </Providers>
      </body>
    </html>
  );
}
