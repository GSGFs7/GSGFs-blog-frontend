import "@/styles/globals.css";
import { clsx } from "clsx";
import { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";

import { Providers } from "./providers";

import { Navbar } from "@/components/navbar/navbar";
import { fontMono, fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import BackgroundImage from "@/components/background-image";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
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
            <NextTopLoader zIndex={999} />
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

            <Footer />
          </div>

          <BackgroundImage />
        </Providers>
      </body>
    </html>
  );
}
