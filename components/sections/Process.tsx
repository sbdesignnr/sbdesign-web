"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

function StepIcon({ index }: { index: string }) {
  const c = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (index === "01")
    return (
      <svg {...c}>
        <path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.3-3.9A8.38 8.38 0 0 1 3.6 8 8.5 8.5 0 0 1 12 3.5a8.38 8.38 0 0 1 9 8z" />
        <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
      </svg>
    );
  if (index === "02")
    return (
      <svg {...c}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    );
  if (index === "03")
    return (
      <svg {...c}>
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    );
  return (
    <svg {...c}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export default function Process() {
  return (
    <section id="proces" className="section gutter">
      <div className="mx-auto max-w-[1400px]">
        {/* header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <Eyebrow className="mb-6">Ako spolupracujeme</Eyebrow>
          <h2 className="display-md">
            Jasný proces. <span className="text-gradient">Žiadne prekvapenia.</span>
          </h2>
          <p className="lead mt-6 max-w-xl">
            Od prvého stretnutia po spustenie viete presne, čo sa deje a kedy. Transparentne, krok za krokom.
          </p>
        </div>

        {/* timeline */}
        <div className="relative">
          {/* horizontal connector (desktop) */}
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-line lg:block" />
          <motion.div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px origin-left lg:block"
            style={{ background: "linear-gradient(90deg, var(--color-azure), var(--color-cyan))" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.6, ease: EASE }}
          />

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: EASE }}
                className="group relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                {/* node */}
                <div className="relative z-10 mb-7 grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-ink-900 text-marble-dim transition-all duration-500 group-hover:border-azure group-hover:bg-azure group-hover:text-white group-hover:shadow-[0_0_30px_-4px_rgba(47,107,255,0.7)]">
                  <StepIcon index={step.index} />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-line-strong bg-ink-950 font-mono text-[10px] text-azure">
                    {step.index}
                  </span>
                </div>

                {/* card */}
                <div className="w-full rounded-2xl border border-line bg-ink-800/30 p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-line-strong">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-azure">{step.duration}</span>
                  <h3 className="mt-3 font-display text-xl font-bold text-marble">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-marble-dim">{step.description}</p>
                  <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="shrink-0 text-azure">
                      <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-marble-muted">
                      {step.output}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line pt-10 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted">Priemerne 3–4 týždne</span>
          <span className="hidden h-1 w-1 rounded-full bg-marble-faint sm:block" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted">30 dní podpory po spustení</span>
          <span className="hidden h-1 w-1 rounded-full bg-marble-faint sm:block" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted">Bez skrytých poplatkov</span>
        </motion.div>
      </div>
    </section>
  );
}
