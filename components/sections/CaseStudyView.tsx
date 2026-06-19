"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/lib/projects";
import Counter from "@/components/ui/Counter";
import CTASection from "@/components/sections/CTASection";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CaseStudyView({ project, next }: { project: Project; next?: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const meta = [
    { l: "Klient", v: project.client },
    project.role ? { l: "Moja rola", v: project.role } : null,
    project.timeline ? { l: "Trvanie", v: project.timeline } : null,
    { l: "Web", v: project.comingSoon ? `${project.liveLabel} · čoskoro` : project.liveLabel ?? "—", href: project.url },
  ].filter(Boolean) as { l: string; v: string; href?: string }[];

  return (
    <main style={{ ["--accent" as string]: project.accent, ["--accent2" as string]: project.accent2 ?? project.accent }}>
      {/* ── HEADER ── */}
      <section className="relative gutter pt-36 pb-12 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[70vh]"
          style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${project.accent}26, transparent 70%)` }}
        />
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/projekty"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted transition-colors hover:text-marble"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Späť na projekty
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white" style={{ background: project.accent }}>
              {project.category}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-marble-muted">{project.industry}</span>
            {project.year && (
              <>
                <span className="h-1 w-1 rounded-full bg-marble-faint" />
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-marble-muted">{project.year}</span>
              </>
            )}
            {project.comingSoon && (
              <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-marble-dim">
                Čoskoro online
              </span>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="mt-6 font-display text-[clamp(2.75rem,9vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.04em]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="mt-6 max-w-2xl font-serif text-2xl italic text-marble-dim md:text-3xl"
          >
            {project.tagline}
          </motion.p>

          {/* meta grid */}
          <div className="mt-12 grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.l}>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-marble-muted">{m.l}</span>
                {m.href ? (
                  <a href={m.href} target="_blank" rel="noopener noreferrer" className="mt-2 block font-display font-semibold text-marble transition-colors hover:text-azure" data-cursor-label="Otvoriť">
                    {m.v} ↗
                  </a>
                ) : (
                  <span className="mt-2 block font-display font-semibold text-marble">{m.v}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section ref={heroRef} className="gutter">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative overflow-hidden rounded-2xl border border-line-strong">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 opacity-50 blur-3xl"
              style={{ background: `radial-gradient(ellipse at center, ${project.accent}55, transparent 70%)` }}
            />
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-[16/8]">
              <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                <Image src={project.image} alt={project.title} fill priority sizes="100vw" className="object-cover object-top" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      {project.metrics && project.metrics.length > 0 && (
      <section className="section gutter">
        <div className="mx-auto grid max-w-[1400px] gap-10 border-y border-line py-12 sm:grid-cols-3">
          {project.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="text-center sm:text-left"
            >
              <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em]" style={{ color: project.accent }}>
                <Counter value={m.value} />
              </div>
              <div className="mt-3 font-display font-semibold text-marble">{m.label}</div>
              {m.sub && <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-marble-muted">{m.sub}</div>}
            </motion.div>
          ))}
        </div>
      </section>
      )}

      {/* ── INTRO ── */}
      {project.intro && (
      <section className="gutter pb-8 pt-8">
        <div className="mx-auto max-w-[1100px]">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE }}
            className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] font-bold leading-[1.18] tracking-[-0.02em] text-marble"
          >
            {project.intro}
          </motion.p>
        </div>
      </section>
      )}

      {/* ── BLOCKS (narrative) ── */}
      {project.blocks && project.blocks.length > 0 && (
      <section className="section gutter">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-20 md:gap-28">
          {project.blocks.map((b, i) => (
            <motion.div
              key={b.kicker}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="grid gap-6 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <span className="font-display text-6xl font-extrabold text-gradient-faint">0{i + 1}</span>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="h-px w-8" style={{ background: project.accent }} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                      {b.kicker}
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-8">
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.02em] text-marble">
                  {b.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-marble-dim">{b.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      )}

      {/* ── STACK + DELIVERABLES ── */}
      <section className="section gutter">
        <div className="mx-auto grid max-w-[1100px] gap-12 border-t border-line pt-14 md:grid-cols-2">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted">Čo som dodal</span>
            <ul className="mt-6 flex flex-col gap-3">
              {project.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 text-marble">
                  <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: `${project.accent}22` }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ color: project.accent }}>
                      <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted">Technológie</span>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-line-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-marble-dim">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {project.discipline.map((d) => (
                <span key={d} className="rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white" style={{ background: `${project.accent}` }}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      {project.testimonial && (
        <section className="section gutter">
          <div className="mx-auto max-w-[1000px] text-center">
            <span aria-hidden className="font-serif text-8xl leading-none" style={{ color: project.accent }}>
              &ldquo;
            </span>
            <blockquote className="-mt-6 font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-tight tracking-[-0.02em] text-marble">
              {project.testimonial.quote}
            </blockquote>
            <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted">
              {project.testimonial.author} — {project.testimonial.role}
            </div>
          </div>
        </section>
      )}

      {/* ── NEXT PROJECT ── */}
      {next && (
        <section className="gutter pb-10">
          <Link
            href={`/projekty/${next.slug}`}
            data-cursor-label="Ďalší"
            className="group relative mx-auto block max-w-[1400px] overflow-hidden rounded-2xl border border-line transition-colors duration-500 hover:border-line-strong"
          >
            <div className="relative grid items-center gap-6 p-8 md:grid-cols-12 md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse at right, ${next.accent}22, transparent 60%)` }}
              />
              <div className="md:col-span-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted">Ďalší projekt</span>
                <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-none tracking-[-0.03em] text-marble transition-colors group-hover:text-white">
                  {next.title}
                </h2>
                <p className="mt-3 max-w-md text-marble-dim">{next.tagline}</p>
              </div>
              <div className="relative md:col-span-4">
                <div className="overflow-hidden rounded-xl border border-line">
                  <div className="relative aspect-[16/10]">
                    <Image src={next.image} alt={next.title} fill sizes="33vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      <CTASection
        eyebrow="Máte podobný projekt?"
        title={
          <>
            Postavme niečo <span className="text-gradient">výnimočné.</span>
          </>
        }
      />
    </main>
  );
}
