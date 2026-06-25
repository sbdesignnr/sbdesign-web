import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ďakujeme",
  robots: "noindex, nofollow",
};

export default function DakujemeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
