"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;
const STAR = "#f6c453";

const testimonials = [
  {
    quote:
      "Web konečne vystihuje to, ako pracujem. Klienti mi píšu, že sa cítili pozvaní ešte pred prvým stretnutím. Dopytov mám trojnásobne viac.",
    author: "ProPsyché",
    role: "Psychoterapia",
    accent: "#8b5cf6",
  },
  {
    quote: "Nový web nám zdvojnásobil dopyty a online pôsobíme rovnako profesionálne ako v teréne.",
    author: "Výťahy Barborík",
    role: "Rodinná firma · 30 rokov",
    accent: "#2f6bff",
  },
  {
    quote: "Maximálna spokojnosť s procesom tvorby webstránky starea.sk. Oceňujem najmä ochotu, ústretovosť a profesionalitu.",
    author: "STAREA Reality",
    role: "Realitná kancelária",
    accent: "#10b981",
  },
];

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-1" aria-label="Hodnotenie 5 z 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={STAR}>
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ char, accent, big = false }: { char: string; accent: string; big?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-display font-bold text-white ${big ? "h-12 w-12 text-lg" : "h-10 w-10 text-sm"}`}
      style={{ background: `linear-gradient(145deg, ${accent}, ${accent}aa)` }}
    >
      {char}
    </span>
  );
}

export default function Testimonials() {
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section className="section gutter">
      <div className="mx-auto max-w-[1400px]">
        {/* header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow className="mb-6">Čo hovoria klienti</Eyebrow>
            <h2 className="display-md">
              Dôveru si treba <span className="text-gradient">zaslúžiť.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-ink-800/40 px-5 py-4">
            <Stars size={16} />
            <div className="leading-none">
              <span className="font-display text-xl font-extrabold text-marble">5.0</span>
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.15em] text-marble-muted">spokojní klienti</span>
            </div>
          </div>
        </div>

        {/* asymmetric grid */}
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* featured */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-ink-800/40 p-9 transition-colors duration-500 hover:border-line-strong md:p-11 lg:col-span-7"
          >
            {/* accent glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
              style={{ background: `radial-gradient(circle, ${featured.accent}, transparent 70%)` }}
            />
            {/* watermark quote */}
            <span aria-hidden className="pointer-events-none absolute right-6 top-2 select-none font-serif text-[9rem] leading-none opacity-10" style={{ color: featured.accent }}>
              &rdquo;
            </span>

            <div className="relative">
              <Stars size={16} />
              <blockquote className="mt-7 max-w-xl font-display text-[clamp(1.5rem,2.4vw,2.3rem)] font-medium leading-[1.25] tracking-[-0.01em] text-marble">
                {featured.quote}
              </blockquote>
            </div>

            <figcaption className="relative mt-10 flex items-center gap-4 border-t border-line pt-7">
              <Avatar char={featured.author.charAt(0)} accent={featured.accent} big />
              <div>
                <span className="block font-display text-lg font-bold text-marble">{featured.author}</span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-marble-muted">{featured.role}</span>
              </div>
            </figcaption>
          </motion.figure>

          {/* two stacked */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((t, i) => (
              <motion.figure
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.12 + i * 0.12, ease: EASE }}
                className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-line bg-ink-800/40 p-8 transition-colors duration-500 hover:border-line-strong"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-50"
                  style={{ background: `radial-gradient(circle, ${t.accent}, transparent 70%)` }}
                />
                <div className="relative">
                  <Stars />
                  <blockquote className="mt-5 font-display text-lg font-medium leading-relaxed text-marble">{t.quote}</blockquote>
                </div>
                <figcaption className="relative mt-7 flex items-center gap-3 border-t border-line pt-5">
                  <Avatar char={t.author.charAt(0)} accent={t.accent} />
                  <div>
                    <span className="block font-display font-semibold text-marble">{t.author}</span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-marble-muted">{t.role}</span>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
