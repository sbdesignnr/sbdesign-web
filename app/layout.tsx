import type { Metadata, Viewport } from "next";
import { Syne, Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

import { site } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Background from "@/components/three/Background";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap", weight: ["500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"] });
const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-instrument", display: "swap", weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.shortPitch,
  keywords: ["web dizajn", "tvorba webov", "web na mieru", "e-shop", "Meta Ads", "Google Ads", "Next.js", "Nitra", "SB Design"],
  authors: [{ name: site.founder }],
  creator: site.founder,
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.shortPitch,
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.shortPitch },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.shortPitch,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    founder: { "@type": "Person", name: site.founder },
    address: { "@type": "PostalAddress", streetAddress: "Mostná 42", postalCode: "949 01", addressLocality: "Nitra", addressCountry: "SK" },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: "SK",
    priceRange: "€€",
  };

  return (
    <html lang="sk" className={`${syne.variable} ${inter.variable} ${mono.variable} ${serif.variable}`}>
      {/* Google Tag Manager (script — vloží sa do <head> dokumentu) */}
      <GoogleTagManager gtmId="GTM-N278CRW6" />
      {/* Google Ads (gtag.js) — vloží sa do <head> dokumentu */}
      <Script
        id="google-ads-src"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18267814679"
        strategy="afterInteractive"
        async
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18267814679');`}
      </Script>
      <body className="antialiased">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N278CRW6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Background />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
