"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site, nav, socials, legalLinks } from "@/lib/site";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-950">
      {/* top accent line */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(47,107,255,0.5) 30%, rgba(24,214,255,0.5) 70%, transparent)" }} />
      {/* ambient glow (static, no filter) */}
      <div aria-hidden className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[80%] -translate-x-1/2 opacity-30" style={{ background: "radial-gradient(ellipse at center, rgba(47,107,255,0.32), transparent 68%)" }} />

      <div className="gutter relative pt-24 pb-9">
        {/* ── main grid ── */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* brand */}
          <div className="lg:col-span-5">
            <Link href="/" aria-label="SB Design — domov" className="inline-flex items-center">
              <Image src="/SB-Design-Logo-1-5.png" alt="SB Design" width={549} height={106} className="h-8 w-auto" />
            </Link>

            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-marble-dim">
              Navrhujem a programujem prémiové weby a vediem kampane, ktoré z návštevníkov robia zákazníkov.
            </p>

            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-900/60 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-azure opacity-70 pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-marble-dim">Voľná kapacita — nové projekty</span>
            </div>

            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-marble-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-azure hover:bg-azure/10 hover:text-white"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* navigation */}
          <div className="lg:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-marble-muted">Navigácia</span>
            <ul className="mt-6 flex flex-col gap-3.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex items-center gap-2 text-[15px] text-marble-dim transition-colors duration-200 hover:text-marble">
                    <span className="h-px w-4 origin-left scale-x-0 bg-azure transition-transform duration-300 group-hover:scale-x-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-marble-muted">Spojme sa</span>
            <a href={`mailto:${site.email}`} className="group mt-5 flex items-center justify-between gap-4 border-b border-line pb-4 transition-colors hover:border-azure">
              <span className="font-display text-xl font-bold text-marble">{site.email}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-azure text-white transition-transform duration-500 group-hover:rotate-45">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
            <div className="mt-5 flex flex-col gap-2 text-[15px]">
              <a href={site.phoneHref} className="text-marble-dim transition-colors hover:text-marble">{site.phone}</a>
              <span className="text-marble-muted">{site.address}</span>
            </div>
          </div>
        </div>

        {/* ── giant wordmark ── */}
        <div className="relative mt-20 select-none">
          {/* glow behind (static, no filter) */}
          <div aria-hidden className="pointer-events-none absolute inset-x-[12%] bottom-[10%] top-[28%] opacity-30" style={{ background: "radial-gradient(ellipse 55% 75% at 50% 50%, rgba(47,107,255,0.24), transparent 68%)" }} />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="wordmark-liquid relative mx-auto block w-fit whitespace-nowrap font-display font-extrabold leading-[0.85] tracking-[-0.05em]"
            style={{ fontSize: "clamp(2rem, 10.3vw, 11rem)" }}
          >
            SB DESIGN
          </motion.div>
        </div>

        {/* ── bottom bar ── */}
        <div className="mt-10 flex flex-col items-center gap-5 border-t border-line pt-7 md:flex-row md:justify-between">
          <span className="font-mono text-[11px] tracking-wide text-marble-muted">
            © {year} {site.legalName}. Všetky práva vyhradené.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="font-mono text-[11px] text-marble-muted transition-colors hover:text-marble-dim">
                {l.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-marble-muted transition-colors hover:text-marble"
          >
            Hore
            <span className="grid h-7 w-7 place-items-center rounded-full border border-line-strong transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-azure group-hover:text-azure">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
