import type { Metadata } from "next";

// A post-conversion thank-you page has no search value and would only dilute the
// site's crawl budget — keep it out of the index, but let link equity flow.
export const metadata: Metadata = {
  title: { absolute: "Ďakujeme — SB Design" },
  robots: { index: false, follow: true },
  alternates: { canonical: "/dakujeme" },
};

export default function DakujemeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
