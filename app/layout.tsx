// FILE: app/layout.tsx
import type { Metadata } from "next";
import { Syne, Inter, Caveat, Cinzel } from "next/font/google";
import "./globals.css";

// Commented out — Navigation and CustomCursor are now embedded in HeroSection.
// import IntroLoader  from "@/components/sections/IntroLoader";
// import Navigation   from "@/components/layout/Navigation";
// import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display:  "swap",
});

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
});

const caveat = Caveat({
  subsets:  ["latin"],
  variable: "--font-caveat",
  display:  "swap",
});

const cinzel = Cinzel({
  subsets:  ["latin"],
  variable: "--font-cinzel",
  display:  "swap",
  weight:   ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default:  "SB DESIGN – Web Developer & Designer",
    template: "%s | SB DESIGN",
  },
  description:
    "Prémiový web developer a dizajnér. Vytváram rýchle, moderné a vizuálne výnimočné webové aplikácie.",
  keywords: ["web developer", "web dizajn", "Next.js", "SB DESIGN"],
  authors:  [{ name: "SB DESIGN" }],
  creator:  "SB DESIGN",
  metadataBase: new URL("https://sbdesign.sk"),
  openGraph: {
    type:        "website",
    locale:      "sk_SK",
    url:         "https://sbdesign.sk",
    siteName:    "SB DESIGN",
    title:       "SB DESIGN – Web Developer & Designer",
    description: "Prémiový web developer a dizajnér.",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "SB DESIGN – Web Developer & Designer",
    description: "Prémiový web developer a dizajnér.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sk"
      className={`${syne.variable} ${inter.variable} ${caveat.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="bg-black text-white font-body min-h-full flex flex-col overflow-x-hidden">
        {children}
        <Footer />
      </body>
    </html>
  );
}
