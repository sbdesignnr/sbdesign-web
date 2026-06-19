import type { Metadata } from "next";
import ContactView from "@/components/sections/ContactView";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Napíšte mi o vašom projekte. Bezplatná konzultácia, jasná cenová ponuka a odpoveď do 24 hodín. SB Design — Nitra.",
};

export default function KontaktPage() {
  return <ContactView />;
}
