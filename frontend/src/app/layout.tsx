import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "@/components/I18nProvider";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "MindLink — AI-Powered Knowledge Platform",
  description:
    "A next-generation social productivity platform replacing scrolling with knowledge paths. Powered by AI summarization, fact-checking, and semantic recommendations.",
  keywords: "AI, knowledge, productivity, social, semantic search, fact-checking",
  openGraph: {
    title: "MindLink",
    description: "AI-driven social productivity platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script id="locale-init" strategy="beforeInteractive">{`(function(){try{var l=localStorage.getItem('mindlink.locale');if(!l){l='en';}var dir=(l==='ar')?'rtl':'ltr';document.documentElement.dataset.locale=l;document.documentElement.lang=(l==='zh')?'zh-CN':l;document.documentElement.dir=dir;}catch(e){document.documentElement.dataset.locale='en';document.documentElement.lang='en';document.documentElement.dir='ltr';}})();`}</Script>
      <Script
        id="theme-init"
        strategy="beforeInteractive"
      >{`(function(){try{var t=localStorage.getItem('mindlink.theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`}</Script>
      <body className="noise antialiased">
        <I18nProvider>{children}</I18nProvider>
        <Footer />
      </body>
    </html>
  );
}
