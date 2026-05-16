"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, Rocket, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
 * Hero
 *
 * Background grid lives in page.tsx (global wrapper) — not here.
 *
 * Stacking context (bottom → top):
 *   z-[1] Grid tracers
 *   z-20  Content — badge · H1 · subtitle · spin-border CTAs
 *   z-30  Project panel — pulse glow + 3D-tilt card + cinematic reveal
 *
 * GSAP:
 *   1. .hero-reveal stagger fade-up
 *   2. panelRef slides in from y:60, then infinite yoyo float
 *   3. Grid tracers loop across screen
 *   4. tiltCardRef 3D tilt (separate useEffect)
 * ─────────────────────────────────────────────────────────────────────────── */

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const tiltCardRef = useRef<HTMLDivElement>(null);

  const hT1 = useRef<HTMLDivElement>(null);
  const hT2 = useRef<HTMLDivElement>(null);
  const vT1 = useRef<HTMLDivElement>(null);
  const vT2 = useRef<HTMLDivElement>(null);
  const vT3 = useRef<HTMLDivElement>(null);

  /* ── GSAP timeline ──────────────────────────────────────────────────────── */
  useGSAP(
    () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-reveal", { y: 30, opacity: 0, duration: 0.7, stagger: 0.1 })
        .from(panelRef.current, { y: 60, opacity: 0, duration: 1.0 }, "-=0.2")
        .call(() => {
          gsap.to(panelRef.current, {
            y: -8, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        });

      ([
        { ref: hT1, dur: 2.6, delay: 0,   gap: 4.0 },
        { ref: hT2, dur: 3.1, delay: 1.8, gap: 5.5 },
      ] as const).forEach(({ ref, dur, delay, gap }) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current, { x: -180 }, { x: W + 180, duration: dur, ease: "none", repeat: -1, delay, repeatDelay: gap });
      });

      ([
        { ref: vT1, dur: 3.0, delay: 0.5, gap: 4.5 },
        { ref: vT2, dur: 3.8, delay: 0,   gap: 6.0 },
        { ref: vT3, dur: 2.9, delay: 2.2, gap: 5.0 },
      ] as const).forEach(({ ref, dur, delay, gap }) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current, { y: -180 }, { y: H + 180, duration: dur, ease: "none", repeat: -1, delay, repeatDelay: gap });
      });
    },
    { scope: sectionRef },
  );

  /* ── 3D tilt ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const card = tiltCardRef.current;
    if (!card) return;

    gsap.set(card, { transformPerspective: 1100 });
    const xTo = gsap.quickTo(card, "rotateY", { duration: 0.55, ease: "power2.out" });
    const yTo = gsap.quickTo(card, "rotateX", { duration: 0.55, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const r  = card.getBoundingClientRect();
      xTo( ((e.clientX - r.left) / r.width  - 0.5) * 10);
      yTo(-((e.clientY - r.top)  / r.height - 0.5) *  5);
    };
    const onLeave = () => { xTo(0); yTo(0); };

    card.addEventListener("mousemove",  onMove,  { passive: true });
    card.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      card.removeEventListener("mousemove",  onMove);
      card.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(card);
      gsap.set(card, { rotateX: 0, rotateY: 0 });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center overflow-x-hidden px-4 pt-28 pb-24 sm:px-6 md:pt-40 md:pb-40"
      aria-label="Hero – SBDESIGN"
    >
      {/* ── Grid tracers ────────────────────────────────────────── z-[1] ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div ref={hT1} className="absolute h-px w-[150px] rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[1px]" style={{ top: "32%" }} />
        <div ref={hT2} className="absolute h-px w-[150px] rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]" style={{ top: "68%" }} />
        <div ref={vT1} className="absolute w-px h-[150px] rounded-full bg-gradient-to-b from-transparent via-blue-500 to-transparent blur-[1px]" style={{ left: "22%" }} />
        <div ref={vT2} className="absolute w-px h-[150px] rounded-full bg-gradient-to-b from-transparent via-blue-400 to-transparent blur-[1px]" style={{ left: "50%" }} />
        <div ref={vT3} className="absolute w-px h-[150px] rounded-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent blur-[1px]" style={{ left: "80%" }} />
      </div>

      {/* ── Content block ────────────────────────────────────────── z-20 ── */}
      <div className="relative z-20 flex max-w-4xl flex-col items-center text-center">

        {/* Badge */}
        <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-white/[0.04] px-4 py-1.5 shadow-[0_0_24px_rgba(0,102,255,0.18)] backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-gray-200 uppercase">
            Prémiový web development
          </span>
        </div>

        {/* H1 */}
        <h1 className="hero-reveal font-syne mt-7 px-2 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-[clamp(2.5rem,3.8vw+1rem,4.5rem)] md:whitespace-nowrap">
          Revolúcia v tvojom digitálnom svete
        </h1>

        {/* Subtitle */}
        <p className="hero-reveal font-inter mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
          Prémiový kód, fascinujúci dizajn a umelá inteligencia. Tvorím weby,
          ktoré nepredávajú šablóny, ale bezkonkurenčný zážitok.
        </p>

        {/* ── Aceternity spin-border CTAs ──────────────────────────────────
            Spinning border: `inset-[-1000%]` span fills a huge area → the 1px
            gap between outer button and inner span exposes the rotating gradient.
            GPU-composited via CSS `animation` — no JS overhead.
        ─────────────────────────────────────────────────────────────────── */}
        <div className="hero-reveal relative z-40 mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">

          {/* ── Primary: Začať projekt ─── */}
          <button
            type="button"
            className="group relative inline-flex h-14 w-52 overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            {/* Blue spinning border */}
            <span
              aria-hidden
              className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#0066FF_50%,#000000_100%)]"
            />
            {/* Inner face — overflow-visible so engine fire can peek out */}
            <span className="relative inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-[#030508] px-6 text-sm font-medium text-white backdrop-blur-3xl transition-colors duration-500 group-hover:bg-[#051024]">

              {/* Rocket + engine fire */}
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                {/* Icon — vibrates on hover, does NOT fly away */}
                <Rocket className="h-4 w-4 text-white transition-colors duration-300 group-hover:animate-[vibrate_0.3s_linear_infinite] group-hover:text-orange-300" />
                {/* Engine fire — gradient flame below the rocket */}
                <span
                  aria-hidden
                  className="absolute -bottom-4 left-1/2 h-6 w-2 -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-500 via-cyan-400 to-transparent opacity-0 blur-[4px] transition-opacity duration-300 group-hover:opacity-100"
                />
              </span>

              <span className="whitespace-nowrap">Začať projekt</span>
            </span>
          </button>

          {/* ── Secondary: Zobraziť portfólio ─── */}
          <button
            type="button"
            className="group relative inline-flex h-14 w-56 overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            {/* Soft blue-white spinning border */}
            <span
              aria-hidden
              className="absolute inset-[-1000%] animate-[spin_3.9s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,rgba(100,140,255,0.7)_50%,#000000_100%)]"
            />
            {/* Inner face */}
            <span className="relative inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-[#030508] px-6 text-sm font-medium text-gray-300 backdrop-blur-3xl transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white">
              <span className="whitespace-nowrap">Zobraziť portfólio</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </button>

        </div>
      </div>

      {/* ── Project panel ─────────────────────────────────────────── z-30 ── */}
      {/*
          panelRef  → GSAP yoyo float + `group` scope for all child hover states
          glow div  → ambient blue reactor pulse behind the card
          tiltCardRef → GSAP 3D tilt + box-shadow on group-hover
      */}
      <div
        ref={panelRef}
        className="group relative z-30 mx-auto mt-10 w-full max-w-6xl rounded-[2rem] [will-change:transform] md:mt-16"
      >
        {/* Reactor glow — sits BEHIND the card, pulses to life on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-4 -z-[1] animate-pulse rounded-[2rem] bg-blue-600/30 opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100"
        />

        {/* Light pillar — soft upward beam */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-full left-1/2 z-0 h-[100px] w-[150px] -translate-x-1/2 bg-blue-500/30 blur-[40px]"
        />

        {/* 3D-tilt card — box-shadow blooms on hover */}
        <div
          ref={tiltCardRef}
          className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#030508]
                     transition-all duration-700 [will-change:transform]
                     group-hover:shadow-[0_0_120px_rgba(0,102,255,0.6)]"
        >
          {/* Project image */}
          <img
            src="/penzion-naj.png"
            alt="Penzión Naj – projekt SBDESIGN"
            className="relative z-0 h-auto w-full object-cover opacity-80
                       transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                       group-hover:scale-[1.03] group-hover:opacity-100"
          />

          {/* Cinematic gradient */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#010204] via-[#010204]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

          {/* Typography reveal */}
          <div className="absolute bottom-0 left-0 z-[3] flex w-full translate-y-10 items-end justify-between p-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:p-12">
            <div>
              <p className="font-inter mb-3 text-sm uppercase tracking-[0.2em] text-blue-400">Najnovší projekt</p>
              <h3 className="font-syne text-3xl font-bold tracking-tight text-white md:text-5xl">Penzión Naj</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-xl transition-all duration-500 group-hover:border-blue-500 group-hover:bg-blue-600 md:h-16 md:w-16">
              <ArrowUpRight className="h-6 w-6 text-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
