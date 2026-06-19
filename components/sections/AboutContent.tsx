"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const principles = [
  {
    t: "Biznis pred estetikou",
    d: "Pekný web, ktorý nepredáva, je drahá maľba. Najprv riešim váš cieľ — viac dopytov, vyšší predaj — a dizajn je nástroj, nie ozdoba.",
  },
  {
    t: "Detail rozhoduje",
    d: "Rozdiel medzi priemerným a prémiovým je v stovkách malých rozhodnutí. Typografia, medzery, timing animácií. Tam sa rodí pocit hodnoty.",
  },
  {
    t: "Rýchlosť nie je luxus",
    d: "Každá sekunda načítania stojí zákazníkov. Staviam weby, ktoré sú bleskové — technicky čisté, optimalizované, bez zbytočného balastu.",
  },
  {
    t: "Priamo a úprimne",
    d: "Pracujete priamo so mnou, nie s account manažérom. Žiadne stratené informácie, žiadne prázdne sľuby. Poviem vám aj to, čo nechcete počuť.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* hero */}
      <section className="relative gutter pt-40 pb-16 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[60vh]"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(47,107,255,0.16), transparent 70%)" }}
        />
        <div className="mx-auto grid max-w-[1400px] items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-7">O mne</Eyebrow>
            <h1 className="display-lg">
              Staviam weby, <br />
              ktoré majú <span className="text-gradient">zmysel pre biznis.</span>
            </h1>
            <p className="lead mt-8 max-w-xl">
              Som Samuel Biben — dizajnér a vývojár z Nitry. Spájam estetiku, technológiu a obchodné myslenie do webov,
              ktoré firmám reálne zarábajú.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/kontakt" size="lg" cursorLabel="Napíšte mi">
                Spolupracujme
              </Button>
              <Button href="/projekty" variant="outline" size="lg" arrow={false}>
                Pozrieť projekty
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-line-strong">
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(165deg, #16213f 0%, #0a0f1e 60%, #06080f 100%)" }} />
              <div aria-hidden className="absolute -bottom-1/4 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle, rgba(47,107,255,0.6), transparent 70%)" }} />
              <Image src="/Fotka-nova-2.png" alt="Samuel Biben" fill sizes="(max-width: 1024px) 90vw, 32vw" className="object-contain object-bottom" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* story */}
      <section className="section gutter">
        <div className="mx-auto max-w-[1100px]">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE }}
            className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] font-bold leading-[1.18] tracking-[-0.02em]"
          >
            Začínal som ako mnoho ľudí — fascinovaný tým, ako sa dá z čistej obrazovky postaviť niečo živé.{" "}
            <span className="text-marble-muted">
              Rýchlo som ale pochopil, že krásny web je len polovica príbehu. Tá druhá, dôležitejšia, je{" "}
            </span>
            <span className="font-serif italic text-gradient">či prináša výsledky.</span>
          </motion.p>

          <div className="mt-12 grid max-w-3xl gap-6 text-lg leading-relaxed text-marble-dim">
            <p>
              Dnes pomáham firmám — od rodinných podnikov s desaťročnou tradíciou po ambiciózne značky — premieňať
              návštevníkov na zákazníkov. Každý web staviam na mieru: žiadne šablóny, žiadne kompromisy v rýchlosti,
              žiadne generické riešenia, ktoré vyzerajú ako tisíc ďalších.
            </p>
            <p>
              Verím, že web je najlepšia investícia, akú firma môže urobiť. Pracuje nonstop, buduje dôveru ešte pred
              prvým kontaktom a dokáže rozhodnúť, či si vás zákazník vyberie — alebo konkurenciu.
            </p>
          </div>
        </div>
      </section>

      {/* principles */}
      <section className="section gutter">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14">
            <Eyebrow className="mb-6">Ako pristupujem k práci</Eyebrow>
            <h2 className="display-md">
              Štyri princípy, <span className="text-gradient">na ktorých staviam.</span>
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
                className="bg-ink-900 p-8 md:p-10"
              >
                <span className="font-display text-5xl font-extrabold text-gradient-faint">0{i + 1}</span>
                <h3 className="mt-5 font-display text-xl font-bold text-marble md:text-2xl">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-marble-dim">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* signature */}
      <section className="gutter pb-10">
        <div className="mx-auto max-w-[1100px] border-t border-line pt-12 text-center">
          <p className="mx-auto max-w-xl text-marble-dim">
            Ak hľadáte niekoho, kto k vášmu projektu pristúpi ako k vlastnému — našli ste ho.
          </p>
          <p className="mt-6 font-serif text-3xl italic text-marble">Samuel Biben</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted">Zakladateľ · {site.name}</p>
        </div>
      </section>
    </>
  );
}
