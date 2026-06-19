import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServicesDetail from "@/components/sections/ServicesDetail";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Weby na mieru, e-shopy a výkonnostný marketing (Meta & Google Ads). Prémiové digitálne riešenia od SB Design, ktoré prinášajú výsledky.",
};

export default function SluzbyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Služby"
        title={
          <>
            Riešenia, ktoré <span className="text-gradient">prinášajú výsledky.</span>
          </>
        }
        intro="Od prvého náčrtu po prvého zákazníka. Tri služby, ktoré spolu tvoria kompletný digitálny rast vašej firmy."
      />
      <ServicesDetail />
      <Process />
      <FAQ />
      <CTASection
        eyebrow="Nie ste si istí, čo potrebujete?"
        title={
          <>
            Poradím vám <span className="text-gradient">zadarmo.</span>
          </>
        }
        subtitle="Na bezplatnej konzultácii spolu nájdeme riešenie, ktoré dáva pre váš biznis najväčší zmysel."
      />
    </main>
  );
}
