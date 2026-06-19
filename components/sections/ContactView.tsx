"use client";

import { motion } from "framer-motion";
import { site, socials } from "@/lib/site";
import ContactForm from "@/components/sections/ContactForm";
import Eyebrow from "@/components/ui/Eyebrow";
import SocialIcon from "@/components/ui/SocialIcon";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const promises = ["Odpoveď do 24 hodín", "Bezplatná konzultácia", "Bez záväzkov"];

const MailIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);
const PhoneIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h3.5l1.5 4.5L8 10.5a11 11 0 0 0 5.5 5.5l2-2 4.5 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
const PinIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

const methods = [
  { l: "Email", v: site.email, href: `mailto:${site.email}`, icon: MailIcon, sub: "Najrýchlejšia cesta ku mne" },
  { l: "Telefón", v: site.phone, href: site.phoneHref, icon: PhoneIcon, sub: "Po–Pia, 9:00 – 18:00" },
  { l: "Adresa", v: site.address, href: `https://maps.google.com/?q=${encodeURIComponent(site.mapsQuery)}`, icon: PinIcon, sub: "Nitra, Slovensko" },
];

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=15&output=embed`;

export default function ContactView() {
  return (
    <main>
      <section className="relative gutter pt-36 pb-24 md:pt-44">
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[65vh]"
          style={{ background: "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(47,107,255,0.16), transparent 72%)" }}
        />

        <div className="mx-auto max-w-[1240px]">
          {/* ── header ─────────────────────────────────────────────── */}
          <motion.div initial="hidden" animate="show" variants={container}>
            <motion.div variants={item}>
              <Eyebrow className="mb-6">Kontakt — spojme sa</Eyebrow>
            </motion.div>

            <motion.h1
              variants={item}
              className="max-w-[16ch] font-display font-extrabold leading-[0.98] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.1rem, 5.2vw, 4rem)" }}
            >
              Povedzte mi o vašom <span className="text-gradient">projekte.</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-marble-dim">
              Bez záväzkov a bez tlaku. Napíšte mi, čo máte na mysli — ozvem sa do 24 hodín s ďalšími otázkami
              alebo rovno s návrhom postupu a orientačnou cenou.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-2.5">
              {promises.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.02] px-4 py-2 text-sm text-marble-dim"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── body grid ──────────────────────────────────────────── */}
          <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
            {/* left — info */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={container}
              className="flex flex-col gap-4 lg:col-span-5"
            >
              {methods.map((m) => (
                <motion.a
                  key={m.l}
                  href={m.href}
                  target={m.l === "Adresa" ? "_blank" : undefined}
                  rel={m.l === "Adresa" ? "noopener noreferrer" : undefined}
                  variants={item}
                  className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-white/[0.015] p-5 transition-[transform,border-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-azure/50"
                >
                  {/* hover glow */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(120% 140% at 0% 50%, rgba(47,107,255,0.12), transparent 60%)" }}
                  />
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-800/60 text-azure transition-colors duration-500 group-hover:border-azure group-hover:text-cyan">
                    {m.icon}
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-marble-muted">{m.l}</span>
                    <span className="mt-1 block truncate font-display text-lg font-semibold text-marble">{m.v}</span>
                    <span className="mt-0.5 block text-xs text-marble-muted">{m.sub}</span>
                  </span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="relative shrink-0 text-marble-muted transition-[transform,color] duration-500 group-hover:translate-x-1 group-hover:text-azure"
                  >
                    <path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              ))}

              {/* availability */}
              <motion.div
                variants={item}
                className="flex items-center gap-3 rounded-2xl border border-line bg-gradient-to-br from-azure/[0.08] to-transparent p-4"
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-cyan pulse-dot" />
                </span>
                <span className="text-sm text-marble-dim">
                  <span className="font-semibold text-marble">Voľná kapacita.</span> Aktuálne prijímam nové projekty.
                </span>
              </motion.div>

              {/* socials */}
              <motion.div variants={item} className="mt-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-marble-muted">Sledujte ma</span>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong px-4 py-2.5 text-sm text-marble-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-azure hover:bg-azure/[0.06] hover:text-marble"
                    >
                      <span className="text-marble-muted transition-colors duration-300 group-hover:text-azure">
                        <SocialIcon name={s.icon} size={16} />
                      </span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* map */}
              <motion.div
                variants={item}
                className="relative mt-1 overflow-hidden rounded-2xl border border-line"
              >
                <div
                  className="aspect-[16/10] w-full"
                  style={{ filter: "grayscale(100%) invert(92%) contrast(86%) brightness(0.6) hue-rotate(175deg)" }}
                >
                  <iframe
                    title={`Mapa — ${site.name}, ${site.address}`}
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-marble-dim">
                  <span className="text-azure">{PinIcon}</span>
                  {site.address}
                </span>
              </motion.div>
            </motion.div>

            {/* right — form */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="lg:col-span-7"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
