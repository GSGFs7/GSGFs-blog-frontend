import "@/styles/globals.css";
import "@fontsource/maple-mono";
import "lxgw-wenkai-screen-web";

import { GoogleAnalytics } from "@next/third-parties/google";
import { clsx } from "clsx";
import { Metadata, Viewport } from "next";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import StructuredData from "@/components/structured-data";
import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from "@/env/public";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s - ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords.slice(),
  applicationName: siteConfig.siteName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.siteName,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.siteName,
    title: {
      default: siteConfig.siteName,
      template: `%s - ${siteConfig.siteName}`,
    },
    description: siteConfig.description,
    images: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og`,
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary",
    title: {
      default: siteConfig.siteName,
      template: `%s - ${siteConfig.siteName}`,
    },
    description: siteConfig.description,
    images: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og`,
      width: 1200,
      height: 630,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="scroll-p-24" lang="zh-CN">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root { background-color: #1c1b22; }
            .light { background-color: #ffffff; }
            .dark { background-color: #1c1b22; }`,
          }}
        />
        <StructuredData />
      </head>
      <body
        className={clsx(
          "bg-background min-h-screen scroll-smooth font-sans antialiased",
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <header
            className="fixed z-40 flex w-full justify-center"
            role="banner"
          >
            <Navbar />
          </header>
          <div className="relative flex min-h-screen w-full flex-col items-center">
            <main className="dark container mx-auto max-w-7xl grow px-6 pt-24">
              {children}
            </main>

            <Footer />
          </div>

          {/* Google Analytics */}
          {NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
            <GoogleAnalytics gaId={NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
          )}
        </Providers>
      </body>
    </html>
  );
}
