import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    locale: "en",
    type: "website",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#1769FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-navy">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-navy"
        >
          Skip to content
        </a>
        <Header />
        <main
          id="main"
          className="flex-1 max-[599px]:text-center max-[599px]:[&_.flex]:justify-center max-[599px]:[&_input]:text-left max-[599px]:[&_textarea]:text-left max-[599px]:[&_select]:text-left"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
