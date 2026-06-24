"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services, type Service } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

function ServiceIcon({ id }: { id: string }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (id === "eshopy")
    return (
      <svg {...common}>
        <path d="M6 2 3 6v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6l-3-4Z" />
        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  if (id === "marketing")
    return (
      <svg {...common}>
        <path d="M3 17l5-5 4 4 8-8" />
        <path d="M16 8h4v4" />
      </svg>
    );
  // weby — browser window
  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
      <path d="M9.5 13.5 8 15l1.5 1.5M14.5 13.5 16 15l-1.5 1.5" />
    </svg>
  );
}

function ServiceVisual({ id, accent }: { id: string; accent: string }) {
  if (id === "weby") {
    // landscape website hero mockup inside a browser frame
    return (
      <div className="relative w-full max-w-[340px] overflow-hidden rounded-lg border border-white/10 bg-ink-900/75 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.85)]">
        {/* browser bar */}
        <div className="flex items-center gap-1 border-b border-white/10 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="ml-2 h-1.5 w-2/5 rounded-full bg-white/10" />
        </div>
        {/* landscape page (16:9) */}
        <div className="flex aspect-[16/9] flex-col p-3">
          {/* nav */}
          <div className="flex shrink-0 items-center justify-between">
            <div className="h-2 w-9 rounded-full" style={{ background: accent }} />
            <div className="flex gap-1.5">
              <span className="h-1.5 w-4 rounded-full bg-white/18" />
              <span className="h-1.5 w-4 rounded-full bg-white/18" />
              <span className="h-1.5 w-4 rounded-full bg-white/18" />
            </div>
          </div>
          {/* hero */}
          <div className="mt-3 flex flex-1 items-stretch gap-3">
            <div className="flex flex-[1.3] flex-col justify-center gap-1.5">
              <div className="h-2.5 w-full rounded bg-white/20" />
              <div className="h-2.5 w-4/5 rounded bg-white/12" />
              <div className="h-2 w-3/5 rounded bg-white/[0.09]" />
              <div className="mt-1.5 h-4 w-1/2 rounded" style={{ background: accent }} />
            </div>
            <div className="w-2/5 shrink-0 rounded-md" style={{ background: `linear-gradient(150deg, ${accent}77, ${accent}1a)` }} />
          </div>
        </div>
        {/* light sweep */}
        <span
          className="sv-anim pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/18 to-transparent"
          style={{ animation: "sv-sweep 3.6s ease-in-out infinite" }}
        />
      </div>
    );
  }

  if (id === "eshopy") {
    // floating product tiles + live cart
    return (
      <div className="relative flex items-end gap-2.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="sv-anim w-[3.4rem] overflow-hidden rounded-lg border border-white/10 bg-ink-900/70"
            style={{ animation: `sv-drift ${3 + i * 0.5}s ease-in-out ${i * 0.35}s infinite` }}
          >
            <div className="h-9" style={{ background: `linear-gradient(150deg, ${accent}66, ${accent}1f)` }} />
            <div className="space-y-1 p-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/15" />
              <div className="h-1.5 w-2/3 rounded-full" style={{ background: accent }} />
            </div>
          </div>
        ))}
        <span className="absolute -right-3 -top-4 grid h-8 w-8 place-items-center rounded-full text-white" style={{ background: accent }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          <span className="sv-anim absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-white" style={{ animation: "sv-pop 1.8s ease-in-out infinite" }} />
        </span>
      </div>
    );
  }

  // marketing — rising bar chart + trend
  const bars = [38, 56, 48, 74, 96];
  return (
    <div className="relative flex h-24 items-end gap-2">
      {bars.map((h, i) => (
        <div
          key={i}
          className="sv-anim w-[1.15rem] origin-bottom rounded-t-[3px]"
          style={{
            height: `${h}%`,
            background: `linear-gradient(to top, ${accent}, ${accent}80)`,
            animation: `sv-bar ${2.6 + i * 0.2}s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
      <svg className="pointer-events-none absolute -top-2 left-0 h-[120%] w-full overflow-visible" viewBox="0 0 100 60" preserveAspectRatio="none">
        <polyline points="6,46 28,34 50,40 72,20 94,4" fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" vectorEffect="non-scaling-stroke" />
        <circle cx="94" cy="4" r="2.4" fill={accent} className="sv-anim" style={{ animation: "sv-pop 1.8s ease-in-out infinite", transformOrigin: "94px 4px" }} />
      </svg>
      <span className="absolute -right-2 -top-3 flex items-center gap-1 rounded-full border border-white/10 bg-ink-950/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: accent }}>
        ↑ rast
      </span>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay: index * 0.12, ease: EASE }}
      className="group relative flex flex-col overflow-hidden rounded-[1.4rem] border border-line bg-ink-800/30 transition-colors duration-500 hover:border-line-strong"
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-[1.4rem] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: `radial-gradient(ellipse at top, ${service.accent}66, transparent 65%)` }}
      />

      {/* ── visual stage ── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(165deg, #0c1326, #06080f)" }} />
        {/* orb glow (ambient, behind) — mäkký gradient, žiadny blur/spin (výkon) */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 transition-opacity duration-700 group-hover:opacity-75"
          style={{ background: `radial-gradient(circle, ${service.accent}55 0%, ${service.accent}1f 38%, transparent 68%)` }}
        />
        {/* fine grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "26px 26px" }}
        />
        {/* thematic animated visual */}
        <div className="absolute inset-0 flex items-center justify-center px-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <ServiceVisual id={service.id} accent={service.accent} />
        </div>
        {/* index + corner icon */}
        <span className="absolute left-6 top-5 z-10 font-mono text-sm" style={{ color: service.accent }}>{service.index}</span>
        <span
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-xl border"
          style={{ borderColor: "var(--color-line-strong)", background: "rgba(4,6,12,0.45)", color: service.accent }}
        >
          <ServiceIcon id={service.id} />
        </span>
      </div>

      {/* ── body ── */}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-marble md:text-[1.7rem]">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-marble-dim">{service.description}</p>

        <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {service.features.slice(0, 6).map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[13px] text-marble-dim">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ background: `${service.accent}24` }}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" style={{ color: service.accent }}>
                  <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          href="/sluzby"
          data-cursor-label="Detail"
          className="group/link mt-7 inline-flex items-center gap-2.5 border-t border-line pt-5 font-display text-sm font-semibold text-marble"
        >
          Pozrieť detail služby
          <span
            className="grid h-7 w-7 place-items-center rounded-full border transition-all duration-500 group-hover:translate-x-1"
            style={{ borderColor: service.accent }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ color: service.accent }}>
              <path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>

      {/* bottom accent line */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
      />
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="sluzby" className="section gutter">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow className="mb-6">Čo pre vás spravím</Eyebrow>
            <h2 className="display-md">
              Tri spôsoby, ako vám <br />
              <span className="text-gradient">pomôžem rásť.</span>
            </h2>
          </div>
          <p className="max-w-sm text-marble-dim lg:pb-2">
            Od prvého náčrtu po prvého zákazníka. Každú službu staviam na mieru vášmu biznisu — nie podľa šablóny.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <Link
            href="/sluzby"
            data-cursor-label="Všetko"
            className="group inline-flex items-center gap-4 rounded-full border border-line-strong px-8 py-4 font-display font-semibold transition-colors hover:border-azure"
          >
            Všetky služby a postup
            <span className="grid h-7 w-7 place-items-center rounded-full bg-azure text-white transition-transform duration-500 group-hover:rotate-45">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
