import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServicesDetail from "@/components/sections/ServicesDetail";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: { absolute: "Tvorba webstránok a online marketing | SB Design Nitra" },
  description:
    "Weby na mieru, e-shopy a výkonnostný marketing (Meta & Google Ads). Prémiové digitálne riešenia od SB Design, ktoré prinášajú výsledky.",
  alternates: { canonical: "/sluzby" },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Tvorba webstránok a e-shopov",
      description:
        "Návrh a vývoj webstránok a e-shopov na mieru, ktoré sú rýchle, moderné a prinášajú konverzie.",
      serviceType: "Tvorba webstránok a e-shopov",
      areaServed: "SK",
      provider: {
        "@type": "ProfessionalService",
        name: "SB Design",
        url: "https://www.sbdesign.sk",
      },
    },
    {
      "@type": "Service",
      name: "Meta & Google Ads výkonnostný marketing",
      description:
        "Správa a optimalizácia platených kampaní na Meta a Google Ads s dôrazom na merateľné výsledky a maximálne ROI.",
      serviceType: "Výkonnostný marketing",
      areaServed: "SK",
      provider: {
        "@type": "ProfessionalService",
        name: "SB Design",
        url: "https://www.sbdesign.sk",
      },
    },
    {
      "@type": "Service",
      name: "UX/UI dizajn a branding",
      description:
        "Tvorba vizuálnej identity a používateľsky prívetivých rozhraní, ktoré posilňujú značku a zlepšujú zákaznícku skúsenosť.",
      serviceType: "UX/UI dizajn a branding",
      areaServed: "SK",
      provider: {
        "@type": "ProfessionalService",
        name: "SB Design",
        url: "https://www.sbdesign.sk",
      },
    },
  ],
};

export default function SluzbyPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
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