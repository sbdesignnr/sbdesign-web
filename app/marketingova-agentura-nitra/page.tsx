import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Marketingová agentúra Nitra | SB Design" },
  description:
    "Marketingová agentúra v Nitre — weby na mieru a výkonnostné kampane (Meta & Google Ads), ktoré firmám prinášajú zákazníkov. Nezáväzná konzultácia zdarma.",
  alternates: { canonical: "/marketingova-agentura-nitra" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SB Design — marketingová agentúra Nitra",
  description:
    "Marketingová agentúra v Nitre: tvorba webstránok a e-shopov na mieru, správa Meta a Google Ads kampaní a budovanie značky pre malé a stredné firmy.",
  url: `${site.url}/marketingova-agentura-nitra`,
  telephone: site.phone,
  email: site.email,
  areaServed: [
    { "@type": "City", name: "Nitra" },
    { "@type": "Country", name: "Slovensko" },
  ],
  address: { "@type": "PostalAddress", streetAddress: "Mostná 42", postalCode: "949 01", addressLocality: "Nitra", addressCountry: "SK" },
  priceRange: "€€",
};

export default function MarketingovaAgenturaNitraPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="Marketingová agentúra — Nitra"
        title={
          <>
            Marketingová agentúra <span className="text-gradient">v Nitre</span>
          </>
        }
        intro="Som marketingová agentúra z Nitry, ktorá firmám stavia weby na mieru a vedie výkonnostné kampane na Google a Facebooku — tak, aby z návštevníkov robili platiacich zákazníkov."
      />

      <section className="gutter pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl space-y-10 text-marble-dim">
          <div>
            <h2 className="display-md mb-5 text-marble">Prečo marketingová agentúra práve v Nitre</h2>
            <p className="leading-relaxed">
              Ako marketingová agentúra so sídlom v Nitre poznám lokálny trh — viem, po čom siahajú zákazníci v regióne a
              ako osloviť firmy, ktoré chcú rásť. Nie som veľká agentúra s desiatimi medzičlánkami: pracujete priamo so
              mnou, takže rozhodnutia sú rýchle a každé euro rozpočtu ide do výsledku, nie do réžie.
            </p>
          </div>

          <div>
            <h2 className="display-md mb-5 text-marble">Čo pre vás marketingová agentúra SB Design spraví</h2>
            <ul className="space-y-4">
              <li>
                <strong className="text-marble">Weby a e-shopy na mieru.</strong> Rýchle, moderné stránky postavené tak,
                aby predávali — nie len „aby boli". Web je základ, na ktorom stojí každá kampaň.
              </li>
              <li>
                <strong className="text-marble">Google Ads.</strong> Cielim na ľudí, ktorí presne teraz hľadajú vašu
                službu, a platíte len za relevantné kliky. Nastavím, meriam a optimalizujem podľa reálnych konverzií.
              </li>
              <li>
                <strong className="text-marble">Meta Ads (Facebook & Instagram).</strong> Budujem dopyt aj tam, kde
                zákazník ešte nehľadá — vizuálom a príbehom značky, ktorý sa páči a predáva.
              </li>
              <li>
                <strong className="text-marble">Branding a vizuálna identita.</strong> Logo, farby a tón, vďaka ktorým
                si vás zákazník zapamätá a dôveruje vám.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="display-md mb-5 text-marble">Pre koho je to určené</h2>
            <p className="leading-relaxed">
              Spolupracujem s malými a strednými firmami z Nitry a celého Slovenska — reštaurácie, penzióny, remeselníci,
              lokálne služby aj e-shopy. Ak potrebujete web, ktorý prináša dopyty, a reklamu, ktorá sa vám vráti,
              marketingová agentúra SB Design je pre vás. Pozrite si{" "}
              <Link href="/projekty" className="text-azure underline underline-offset-4">
                moje projekty
              </Link>{" "}
              alebo{" "}
              <Link href="/sluzby" className="text-azure underline underline-offset-4">
                kompletné služby
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Stats />
      <Process />
      <Testimonials />
      <FAQ />
      <CTASection
        eyebrow="Marketingová agentúra Nitra — voľná kapacita"
        title={
          <>
            Poďme rozbehnúť <span className="text-gradient">váš marketing.</span>
          </>
        }
        subtitle="Na bezplatnej konzultácii prejdeme váš biznis a navrhnem, čo vám prinesie najviac zákazníkov. Stačí jeden e-mail."
      />
    </main>
  );
}
