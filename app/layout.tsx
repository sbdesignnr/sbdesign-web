import type { Metadata, Viewport } from "next";
import { Syne, Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { site, socials, googleBusinessUrl } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Background from "@/components/three/Background";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap", weight: ["500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"], preload: false });
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
  // POZOR: žiadny canonical tu — root metadata dedia VŠETKY podstránky a každá
  // by potom tvrdila, že je duplikát homepage. Canonical patrí do každej stránky.
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
    // sameAs prepája web s oficiálnymi profilmi firmy — Google tak potvrdí, že je
    // to tá istá entita (posilňuje značku + lokálne SEO). Odvodené zo `socials`,
    // nech to ostane v synchrone s pätičkou.
    sameAs: [...socials.map((s) => s.href), googleBusinessUrl],
  };

  return (
    <html lang="sk" className={`${syne.variable} ${inter.variable} ${mono.variable} ${serif.variable}`}>
      {/* GTM + Google Ads. `lazyOnload` = až po `load`, takže 420 kB analytiky
          nesúťaží s hydratáciou a nezdržuje LCP. Meranie ani konverzie tým
          neprichádzajú — dataLayer sa plní hneď a GTM ho po štarte spracuje. */}
      <Script id="gtm-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18267814679');`}
      </Script>
      <Script id="gtm-loader" strategy="lazyOnload">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N278CRW6');`}
      </Script>
      <Script
        id="google-ads-src"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18267814679"
        strategy="lazyOnload"
      />
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
