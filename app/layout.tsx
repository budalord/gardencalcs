import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Editorial Almanac type stack — load all three in layout so CSS vars resolve.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.title ?? siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    ...(siteConfig.twitterHandle && { creator: siteConfig.twitterHandle }),
  },
  // NOTE: intentionally NOT setting alternates.canonical here.
  // Next.js App Router merges metadata from parent layouts into children,
  // so a root-level canonical silently overrides any page that forgets to
  // declare its own — causing every page's canonical to point at the
  // homepage. Each page (including app/page.tsx) must declare its own
  // alternates.canonical explicitly.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      style={{
        // Wire Next font loaders into the CSS custom-property stack declared in globals.css.
        // These override the fallbacks at :root so the whole site picks up loaded webfonts.
        ["--font-sans" as string]: `var(--font-inter), -apple-system, BlinkMacSystemFont, system-ui, sans-serif`,
        ["--font-serif" as string]: `var(--font-source-serif), "Iowan Old Style", Georgia, serif`,
        ["--font-mono" as string]: `var(--font-jetbrains), ui-monospace, Menlo, monospace`,
      }}
    >
      <body className="min-h-screen flex flex-col bg-cream text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
