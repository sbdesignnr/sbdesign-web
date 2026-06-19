"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import HeroShowreel from "./HeroShowreel";

const EASE = [0.16, 1, 0.3, 1] as const;

function Word({ children, delay, className = "" }: { children: string; delay: number; className?: string }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ y: "40%", opacity: 0, filter: "blur(6px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* ── Layer 0 · cinematic showreel of real work ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: EASE }}
        className="absolute inset-0"
      >
        <HeroShowreel />
      </motion.div>

      {/* ── Layer 1 · darkening veils ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "rgba(4,6,12,0.5)" }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 72% 68% at 50% 48%, rgba(4,6,12,0.94) 6%, rgba(4,6,12,0.55) 46%, transparent 82%)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, #04060c 6%, transparent)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40" style={{ background: "linear-gradient(to bottom, rgba(4,6,12,0.9), transparent)" }} />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />

      {/* ── Layer 2 · viewfinder frame ── */}
      <div aria-hidden className="pointer-events-none absolute inset-5 z-[5] hidden md:block">
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((pos) => (
          <span key={pos} className={`absolute h-7 w-7 border-white/20 ${pos}`} />
        ))}
      </div>

      {/* ── Layer 3 · content ── */}
      <div className="relative z-10 mx-auto w-full max-w-4xl gutter text-center">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="mb-9 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-azure/60" />
          <span className="label text-marble-dim">Digitálne štúdio — Nitra</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-azure/60" />
        </motion.div>

        {/* headline */}
        <h1 className="relative font-display font-extrabold tracking-[-0.035em]" style={{ textShadow: "0 2px 60px rgba(4,6,12,0.75)" }}>
          <span className="block leading-[0.98]" style={{ fontSize: "clamp(2.1rem, 5.6vw, 4.9rem)" }}>
            <Word delay={0.25}>Krásne</Word> <Word delay={0.32}>weby,</Word> <Word delay={0.39}>ktoré</Word>
          </span>

          {/* accent line */}
          <span className="relative my-1 block leading-[0.92]" style={{ fontSize: "clamp(2.5rem, 6.9vw, 5.9rem)" }}>
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
              style={{ background: "radial-gradient(ellipse, rgba(47,107,255,0.5), rgba(24,214,255,0.14) 45%, transparent 70%)" }}
            />
            <Word delay={0.5} className="font-serif italic text-gradient">predávajú</Word>
            <span className="font-serif italic text-marble-muted" style={{ fontSize: "0.58em" }}>{" "}&amp;</span>
          </span>

          <span className="block leading-[0.98]" style={{ fontSize: "clamp(2.1rem, 5.6vw, 4.9rem)" }}>
            <Word delay={0.74}>budujú</Word> <Word delay={0.84}>značku.</Word>
          </span>
        </h1>

        {/* sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-marble-dim"
        >
          Navrhujem a programujem prémiové weby na mieru a vediem výkonnostné kampane, ktoré z návštevníkov robia
          zákazníkov.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/kontakt" size="lg" cursorLabel="Poďme do toho">Začať projekt</Button>
          <Button href="/projekty" variant="outline" size="lg" arrow={false} cursorLabel="Pozri">Pozrieť projekty</Button>
        </motion.div>
      </div>
    </section>
  );
}
