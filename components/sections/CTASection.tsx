"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const trust = ["Bezplatná konzultácia", "Odpoveď do 24 hodín", "Bez záväzkov", "100 % na mieru"];

export default function CTASection({
  title,
  subtitle = "Predstavte si web, na ktorý budete hrdí — a ktorý vám prináša zákazníkov aj keď spíte. Stačí jeden e-mail a začneme.",
  eyebrow = "Voľná kapacita — prijímam nové projekty",
}: {
  title?: React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      glow.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`;
    });
  };

  return (
    <section className="section gutter">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          ref={cardRef}
          onPointerMove={onPointerMove}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: EASE }}
          className="group relative isolate overflow-hidden rounded-[2.5rem] border border-line-strong px-6 py-20 text-center shadow-[0_40px_120px_-55px_rgba(47,107,255,0.55)] sm:px-12 md:py-28"
        >
          {/* interactive cursor glow (sleduje myš po karte) */}
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 -z-10 h-[640px] w-[640px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(circle, rgba(74,135,255,0.22) 0%, rgba(24,214,255,0.08) 40%, transparent 66%)", willChange: "transform" }}
          />
          {/* ── static background ── */}
          <div aria-hidden className="absolute inset-0 -z-30" style={{ background: "linear-gradient(165deg, #0c1736 0%, #080d1c 45%, #05070e 100%)" }} />
          {/* core glow (static, soft radial — no filter) */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 -z-20 h-[130%] w-[140%] -translate-x-1/2 -translate-y-1/3 rounded-full"
            style={{ background: "radial-gradient(ellipse at center, rgba(47,107,255,0.4), rgba(24,214,255,0.12) 36%, transparent 64%)" }}
          />
          {/* corner glow (static) */}
          <div aria-hidden className="absolute -left-20 bottom-0 -z-20 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(24,214,255,0.22), transparent 68%)" }} />
          {/* faint grid */}
          <div
            aria-hidden
            className="absolute inset-0 -z-20 opacity-[0.05]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "44px 44px" }}
          />
          <div className="grain absolute inset-0 -z-10" />

          {/* ── content ── */}
          <div className="relative">
            {/* eyebrow / scarcity */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-ink-950/40 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-azure opacity-70 pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-marble-dim">{eyebrow}</span>
            </span>

            {/* headline */}
            <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.3rem,6.2vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              {title ?? (
                <>
                  Postavme váš <br className="hidden sm:block" />
                  <span className="text-gradient">najlepší web.</span>
                </>
              )}
            </h2>

            {/* subtitle */}
            <p className="mx-auto mt-7 max-w-xl text-marble-dim lg:text-lg">{subtitle}</p>

            {/* CTA */}
            <div className="mt-11 flex flex-col items-center gap-5">
              <div className="relative">
                <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-70" style={{ background: "radial-gradient(circle, rgba(47,107,255,0.5) 0%, rgba(47,107,255,0.14) 40%, transparent 72%)" }} />
                <Button href="/kontakt" size="lg">Začať projekt</Button>
              </div>
              <a href={site.phoneHref} className="font-display text-sm font-medium text-marble-dim transition-colors hover:text-marble">
                alebo rovno zavolajte <span className="text-marble">{site.phone}</span>
              </a>
            </div>

            {/* trust chips */}
            <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {trust.map((t) => (
                <span key={t} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-marble-muted">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-azure">
                    <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
