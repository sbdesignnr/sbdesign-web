import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import PageHero from "@/components/sections/PageHero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Projekty",
  description:
    "Vybrané projekty SB Design — weby na mieru, e-shopy a značky, ktoré prinášajú reálne výsledky. Pozrite si case studies.",
};

export default function ProjektyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Portfólio · Case studies"
        title={
          <>
            Práca, ktorá <span className="text-gradient">predáva.</span>
          </>
        }
        intro="Každý projekt rieši konkrétny biznisový problém. Nižšie nájdete príbehy za vybranými webmi — výzvu, prístup a výsledok."
      />
      <section className="gutter pb-10">
        <div className="mx-auto max-w-[1400px]">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
      <CTASection
        eyebrow="Ďalší príbeh"
        title={
          <>
            Bude ten ďalší <span className="text-gradient">váš?</span>
          </>
        }
      />
    </main>
  );
}
