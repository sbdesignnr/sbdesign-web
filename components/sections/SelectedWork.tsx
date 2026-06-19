"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { featuredProjects } from "@/lib/projects";
import Eyebrow from "@/components/ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

function ArrowCircle({ accent, active }: { accent: string; active: boolean }) {
  return (
    <span
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500"
      style={{ borderColor: active ? accent : "var(--color-line-strong)", background: active ? accent : "transparent" }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: active ? "#fff" : "var(--color-marble-dim)" }}>
        <path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function SelectedWork() {
  const [active, setActive] = useState(0);
  const project = featuredProjects[active];

  return (
    <section id="projekty" className="section gutter">
      <div className="mx-auto max-w-[1400px]">
        {/* header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow className="mb-6">Vybrané projekty</Eyebrow>
            <h2 className="font-display font-extrabold leading-[0.95] tracking-[-0.035em]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.6rem)" }}>
              Práca, ktorá <span className="text-gradient">hovorí za seba.</span>
            </h2>
          </div>
          <p className="max-w-xs text-marble-dim md:text-right">
            Každý projekt rieši konkrétny biznisový cieľ. Žiadne dva weby nie sú rovnaké.
          </p>
        </div>

        {/* ── desktop: interactive showcase ── */}
        <div className="hidden items-stretch gap-12 lg:grid lg:grid-cols-12">
          {/* list */}
          <div className="lg:col-span-5">
            <div className="border-t border-line">
              {featuredProjects.map((p, i) => {
                const on = active === i;
                return (
                  <Link
                    key={p.slug}
                    href={`/projekty/${p.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group/row relative flex items-center gap-5 border-b border-line py-7 pl-9"
                  >
                    {/* active accent bar */}
                    <span
                      className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full transition-all duration-500"
                      style={{ background: p.accent, height: on ? "58%" : "0%" }}
                    />
                    <span className="font-mono text-sm transition-colors duration-300" style={{ color: on ? p.accent : "var(--color-marble-muted)" }}>
                      0{i + 1}
                    </span>
                    <div className="flex-1 transition-transform duration-500" style={{ transform: on ? "translateX(10px)" : "translateX(0)" }}>
                      <h3
                        className="font-display text-[clamp(1.6rem,2.4vw,2.4rem)] font-extrabold leading-none tracking-[-0.025em] transition-colors duration-300"
                        style={{ color: on ? "var(--color-marble)" : "var(--color-marble-dim)" }}
                      >
                        {p.title}
                      </h3>
                      <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-marble-muted">
                        {p.category} · {p.year}
                      </span>
                    </div>
                    <ArrowCircle accent={p.accent} active={on} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* preview */}
          <div className="lg:col-span-7">
            <Link href={`/projekty/${project.slug}`} data-cursor-label="Otvoriť" className="group relative block">
              {/* glows (stacked, crossfade colour) */}
              {featuredProjects.map((p, i) => (
                <div
                  key={p.slug}
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-3xl transition-opacity duration-700"
                  style={{ background: `radial-gradient(ellipse at center, ${p.accent}55, transparent 70%)`, opacity: active === i ? 0.6 : 0 }}
                />
              ))}
              {/* frame */}
              <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-800">
                <div className="flex items-center gap-2 border-b border-line bg-ink-900/80 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="ml-3 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-marble-muted">
                    {project.liveLabel}
                  </span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  {featuredProjects.map((p, i) => (
                    <Image
                      key={p.slug}
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="60vw"
                      priority={i === 0}
                      className="object-cover object-top transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ opacity: active === i ? 1 : 0 }}
                    />
                  ))}
                </div>
              </div>
            </Link>

            {/* active details */}
            <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="max-w-md"
                >
                  <p className="text-marble-dim">{project.summary}</p>
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-x-9 gap-y-3">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="font-display text-2xl font-extrabold" style={{ color: project.accent }}>{m.value}</span>
                          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-marble-muted">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <Link
                href={`/projekty/${project.slug}`}
                className="group inline-flex shrink-0 items-center gap-3 font-display text-sm font-semibold text-marble"
                data-cursor-label="Otvoriť"
              >
                Case study
                <span className="grid h-8 w-8 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:border-azure group-hover:bg-azure">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── mobile: stacked cards ── */}
        <div className="flex flex-col gap-6 lg:hidden">
          {featuredProjects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <Link href={`/projekty/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-line bg-ink-800/40">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.image} alt={p.title} fill sizes="100vw" className="object-cover object-top" />
                  <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,6,12,0.85), transparent 55%)" }} />
                  <span className="absolute left-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-marble">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-marble">{p.title}</h3>
                  <p className="mt-2 text-sm text-marble-dim">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4">
                    {(p.metrics && p.metrics.length > 0
                      ? p.metrics.map((m) => (
                          <div key={m.label}>
                            <span className="font-display text-lg font-extrabold" style={{ color: p.accent }}>{m.value}</span>
                            <span className="ml-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-marble-muted">{m.label}</span>
                          </div>
                        ))
                      : p.discipline.slice(0, 3).map((d) => (
                          <span key={d} className="font-mono text-[9px] uppercase tracking-[0.12em] text-marble-muted">{d}</span>
                        )))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/projekty"
            data-cursor-label="Všetky"
            className="group inline-flex items-center gap-4 rounded-full border border-line-strong px-8 py-4 font-display font-semibold transition-colors hover:border-azure"
          >
            Pozrieť všetky projekty
            <span className="grid h-7 w-7 place-items-center rounded-full bg-azure text-white transition-transform duration-500 group-hover:rotate-45">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
