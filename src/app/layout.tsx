import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Manrope } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Interactions } from "@/components/interactions";
import { RevealObserver } from "@/components/reveal-observer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { site } from "@/content/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
// Jost is the logo's typeface
const jost = Jost({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", locale: "en_IN", siteName: site.name },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f6f1e7" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phoneDisplay,
  sameAs: Object.values(site.social),
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${manrope.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables scroll-reveal styles only when JavaScript is running */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="bg-ink text-paper sr-only z-50 px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
        <Footer />
        <WhatsAppFloat />
        <RevealObserver />
        <SmoothScroll />
        <Interactions />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
