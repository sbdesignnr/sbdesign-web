"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/content";
import Button from "@/components/ui/Button";
import ServiceVisual from "@/components/sections/ServiceVisual";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ServicesDetail() {
  return (
    <section className="gutter">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-10 md:gap-14">
        {services.map((s, i) => {
          const reversed = i % 2 === 1;
          return (
            <motion.div
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="group relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-line bg-ink-900/40 p-6 transition-transform duration-500 ease-out hover:-translate-y-1 sm:p-9 lg:p-12"
            >
              {/* accent ring + shadow on hover (per-service color) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 0 1px ${s.accent}59, 0 50px 120px -60px ${s.accent}` }}
              />
              {/* ghost index */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 right-2 select-none font-display text-[7rem] font-extrabold leading-none tracking-tighter opacity-[0.07] sm:right-8 sm:text-[10rem]"
                style={{ color: s.accent }}
              >
                {s.index}
              </span>
              {/* corner accent glow (soft radial — žiadny blur filter kvôli výkonu) */}
              <span
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-50 transition-opacity duration-700 group-hover:opacity-80"
                style={{ background: `radial-gradient(circle, ${s.accent}55 0%, ${s.accent}1f 35%, transparent 70%)` }}
              />

              <div className="relative grid items-center gap-9 lg:grid-cols-12 lg:gap-14">
                {/* visual */}
                <div className={`lg:col-span-5 ${reversed ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <ServiceVisual motif={s.id} accent={s.accent} className="aspect-[5/4] w-full rounded-2xl border border-line-strong" />
                </div>

                {/* text */}
                <div className={`lg:col-span-7 ${reversed ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-9" style={{ background: s.accent }} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: s.accent }}>
                      {s.short}
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold leading-[1.02] tracking-[-0.03em]" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)" }}>
                    {s.title}
                  </h2>

                  <p className="mt-5 max-w-xl leading-relaxed text-marble-dim lg:text-[1.05rem]">{s.description}</p>

                  {/* features */}
                  <div className="mt-8 grid grid-cols-1 gap-x-7 gap-y-3 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-marble-dim">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: `${s.accent}22` }}>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ color: s.accent }}>
                            <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* deliverables */}
                  <div className="mt-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-marble-muted">Súčasťou dodania</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.deliverables.map((d) => (
                        <span key={d} className="rounded-full border border-line-strong bg-white/[0.02] px-3.5 py-1.5 text-[13px] text-marble-dim">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* footer: price + CTA */}
                  <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-7">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-marble-muted">Cena</span>
                      <div className="font-display text-xl font-extrabold text-marble">Na mieru projektu</div>
                      <span className="text-[13px] text-marble-muted">Presná ponuka po bezplatnej konzultácii.</span>
                    </div>
                    <Button href="/kontakt" size="md" cursorLabel="Dopyt">
                      Mám záujem
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
