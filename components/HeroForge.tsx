"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Building2, Globe, Briefcase, Zap, Monitor } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
 * TEXT SANDWICH — 3 layers inside a positioned wrapper + UI below:
 *
 *   z-0   SOLID TEXT  — brand gradient #0033CC→#0066FF→#00FFFF, behind hands
 *   z-10  HANDS       — opaque (no blend mode) → physically covers solid text
 *   z-20  HOLLOW TEXT — same coords, transparent fill + white/cyan stroke
 *                        Floats above hands → stroke always visible → 3-D illusion
 *   z-30  UI          — subtitle · CTA · trust logos, pointer-events-auto
 *
 * No mix-blend-lighten on the hands — that was causing the solid text to bleed
 * through. Opaque hands genuinely occlude the gradient layer beneath them.
 * ─────────────────────────────────────────────────────────────────────────── */

/* ── Glitch keyframes ─────────────────────────────────────────────────────── */
const GLITCH_L = {
  opacity: [0.9, 0.75, 1, 0.8, 0.95, 1, 0.9],
  x: [0, -2, 0, 2, 0, 0, 0],
  filter: [
    "brightness(1) saturate(1)",
    "hue-rotate(160deg) brightness(1.4) saturate(2)",
    "brightness(1) saturate(1)",
    "hue-rotate(200deg) brightness(1.3) saturate(1.8)",
    "brightness(1) saturate(1)",
    "brightness(1) saturate(1)",
    "brightness(1) saturate(1)",
  ],
};

const GLITCH_R = {
  opacity: [0.92, 1, 0.78, 0.95, 0.85, 1, 0.92],
  x: [0, 2, 0, -2, 0, 0, 0],
  filter: [
    "brightness(1) saturate(1)",
    "hue-rotate(240deg) brightness(1.4) saturate(1.8)",
    "brightness(1) saturate(1)",
    "hue-rotate(190deg) brightness(1.3) saturate(1.6)",
    "brightness(1) saturate(1)",
    "brightness(1) saturate(1)",
    "brightness(1) saturate(1)",
  ],
};

const IDLE_L: typeof GLITCH_L = { opacity: [1], x: [0], filter: ["brightness(1) saturate(1)"] };
const IDLE_R: typeof GLITCH_R = { opacity: [1], x: [0], filter: ["brightness(1) saturate(1)"] };

const LOGOS = [
  { Icon: Building2, label: "Real estate" },
  { Icon: Globe,     label: "Tech"        },
  { Icon: Briefcase, label: "Finance"     },
  { Icon: Zap,       label: "Energy"      },
  { Icon: Monitor,   label: "SaaS"        },
] as const;

export default function HeroForge() {
  const sectionRef  = useRef<HTMLElement>(null);
  const halftoneRef = useRef<HTMLDivElement>(null);
  const handsRef    = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const logosRef    = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);

  /* ── GSAP entrance + halftone parallax ─────────────────────────────────── */
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power4.out" } });

      /* Both .sandwich-text elements animate together → always in sync */
      tl.fromTo(
        ".sandwich-text",
        { clipPath: "inset(0 0 100% 0)", y: 50 },
        { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.9 },
      )
        .fromTo(
          handsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.8, ease: "power2.out" },
          0.1,
        )
        .fromTo(
          [subRef.current, ctaRef.current],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 },
          0.55,
        )
        .fromTo(
          logosRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          0.78,
        );

      /* Halftone parallax */
      const onMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(halftoneRef.current, {
          backgroundPosition: `${-nx * 20}px ${-ny * 20}px`,
          duration: 1.8, ease: "power2.out",
        });
      };
      const onLeave = () =>
        gsap.to(halftoneRef.current, {
          backgroundPosition: "0px 0px",
          duration: 2.4, ease: "power2.inOut",
        });

      section.addEventListener("mousemove", onMove);
      section.addEventListener("mouseleave", onLeave);
      return () => {
        section.removeEventListener("mousemove", onMove);
        section.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: sectionRef },
  );

  /* ── Glitch + scan transition helpers ──────────────────────────────────── */
  const glitchTL = { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const };
  const glitchTR = { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const, delay: 0.4 };
  const idleT    = { duration: 0.5 };

  const scanT  = (d: number) =>
    hovered ? { duration: d, repeat: Infinity, ease: "linear" as const } : { duration: 0.4 };
  const sliceT = (d: number) =>
    hovered ? { duration: d, repeat: Infinity, ease: "easeInOut" as const } : {};

  return (
    <section
      ref={sectionRef}
      aria-label="Hero – SBDESIGN"
      className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Halftone dot-grid parallax — global background */}
      <div
        ref={halftoneRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none will-change-[background-position]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
       *  THREE-LAYER TEXT SANDWICH
       *  All three divs are absolute inset-0 inside this wrapper so they
       *  occupy the exact same screen area and the z-values are unambiguous.
       * ════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden mt-[-5rem] md:mt-0">

        {/* ── LAYER 1 (z-0): SOLID GRADIENT TEXT — behind the hands ─────── */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
          <h1
            className="sandwich-text text-[14vw] md:text-[11vw] font-bold font-syne leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#0033CC] via-[#0066FF] to-[#00FFFF] drop-shadow-[0_0_50px_rgba(0,102,255,0.6)] text-center uppercase"
          >
            Digitálny<br />Marketing.
          </h1>
        </div>

        {/* ── LAYER 2 (z-10): HANDS — opaque, physically covers Layer 1 ─── */}
        {/*
         *  No mix-blend-lighten here. Opaque images occlude the gradient text
         *  beneath them cleanly. Framer Motion handles breathing + glitch.
         *  GSAP fades this ref from opacity:0 → 1 on entrance.
         */}
        <div
          ref={handsRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="absolute inset-0 z-10 pointer-events-none flex"
        >

          {/* Left hand */}
          <motion.div
            animate={{ y: [-4, 6, -4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-1/2 h-full overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              animate={hovered ? GLITCH_L : IDLE_L}
              transition={hovered ? glitchTL : idleT}
            >
              <img
                src="/michelangelo_touch.png"
                alt=""
                fetchPriority="high"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[100vw] max-w-none h-auto"
                draggable={false}
              />
            </motion.div>

            {/* Cyan scan lines */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              animate={
                hovered
                  ? { opacity: [0, 0.28, 0.06, 0.32, 0, 0.18, 0], backgroundPositionY: ["0%", "100%"] }
                  : { opacity: 0 }
              }
              transition={scanT(3.6)}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.09) 3px, rgba(0,255,255,0.09) 4px)",
                backgroundSize: "100% 8px",
              }}
            />

            {/* Pixel-slice artefact */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden pointer-events-none"
              animate={hovered ? { opacity: [0, 0, 0, 0, 0.65, 0, 0, 0] } : { opacity: 0 }}
              transition={sliceT(2.9)}
              style={{ clipPath: "inset(32% 0 54% 0)" }}
            >
              <img
                src="/michelangelo_touch.png"
                alt=""
                style={{
                  position: "absolute", left: 0, top: "50%",
                  transform: "translateY(-50%) translateX(18px)",
                  width: "100vw", maxWidth: "none", height: "auto",
                  filter: "hue-rotate(180deg) brightness(1.6)",
                }}
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* Right hand */}
          <motion.div
            animate={{ y: [-6, 4, -6] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="relative w-1/2 h-full overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              animate={hovered ? GLITCH_R : IDLE_R}
              transition={hovered ? glitchTR : idleT}
            >
              <img
                src="/michelangelo_touch.png"
                alt=""
                fetchPriority="high"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[100vw] max-w-none h-auto"
                draggable={false}
              />
            </motion.div>

            {/* Magenta scan lines */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              animate={
                hovered
                  ? { opacity: [0.22, 0, 0.3, 0.05, 0.24, 0], backgroundPositionY: ["100%", "0%"] }
                  : { opacity: 0 }
              }
              transition={scanT(4.4)}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,255,0.09) 3px, rgba(255,0,255,0.09) 4px)",
                backgroundSize: "100% 8px",
              }}
            />

            {/* Pixel-slice artefact */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden pointer-events-none"
              animate={hovered ? { opacity: [0, 0, 0, 0.6, 0, 0, 0, 0] } : { opacity: 0 }}
              transition={sliceT(3.5)}
              style={{ clipPath: "inset(51% 0 31% 0)" }}
            >
              <img
                src="/michelangelo_touch.png"
                alt=""
                style={{
                  position: "absolute", right: 0, top: "50%",
                  transform: "translateY(-50%) translateX(-18px)",
                  width: "100vw", maxWidth: "none", height: "auto",
                  filter: "hue-rotate(270deg) brightness(1.6)",
                }}
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* Data arc glow — faulty connection at the fingertip gap */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={
              hovered
                ? { opacity: [0, 0.6, 0.1, 0.75, 0, 0.5, 0.15, 0], scale: [0.8, 1.1, 0.9, 1.3, 0.85, 1.05, 0.9, 0.8] }
                : { opacity: 0, scale: 0.8 }
            }
            transition={hovered ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }}
            style={{
              width: "220px", height: "220px", borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,255,255,0.95) 0%, rgba(0,180,255,0.45) 35%, rgba(0,102,255,0.2) 65%, transparent 80%)",
              filter: "blur(14px)",
            }}
          />
        </div>

        {/* ── LAYER 3 (z-20): HOLLOW STROKE TEXT — above the hands ─────── */}
        {/*
         *  Transparent fill + white/cyan stroke.
         *  Sits above the hands → stroke outline is always visible,
         *  even where hands completely cover the solid gradient text.
         *  This recreates the letterform contour above the hands → 3-D illusion.
         */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
          <h1
            aria-hidden="true"
            className={`sandwich-text text-[14vw] md:text-[11vw] font-bold font-syne leading-[0.85] tracking-tighter text-transparent text-center uppercase transition-all duration-500 ${
              hovered
                ? "[-webkit-text-stroke:2px_rgba(0,255,255,0.85)]"
                : "[-webkit-text-stroke:2px_rgba(255,255,255,0.50)]"
            }`}
          >
            Digitálny<br />Marketing.
          </h1>
        </div>

      </div>
      {/* ── END TEXT SANDWICH ─────────────────────────────────────────────── */}

      {/* ══════════════════════════════════════════════════════════════════════
       *  z-30 ─ UI — subtitle · CTA · trust logos
       *  Sits in normal document flow, below the sandwich wrapper.
       * ════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-30 flex flex-col items-center justify-center mt-8 px-4 pb-14 pointer-events-auto w-full">

        <p
          ref={subRef}
          style={{ opacity: 0 }}
          className="font-inter font-light text-gray-300 text-lg md:text-xl max-w-2xl text-center tracking-wide leading-relaxed drop-shadow-lg"
        >
          Prémiové digitálne monumenty na mieru.{" "}
          <span className="text-white font-medium">Nekompromisná kvalita</span>
          , unikátny dizajn.
        </p>

        <div
          ref={ctaRef}
          style={{ opacity: 0 }}
          className="mt-10 pointer-events-auto"
        >
          <button
            type="button"
            className="group flex items-center gap-3 rounded-full bg-black border border-white/20 text-white px-10 py-5 font-inter font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-110 hover:border-blue-500/70 hover:shadow-[0_0_32px_rgba(0,102,255,0.3),0_0_64px_rgba(0,102,255,0.12)]"
          >
            Začať projekt
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <div
          ref={logosRef}
          style={{ opacity: 0 }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <p className="font-inter text-[9px] font-semibold uppercase tracking-[0.35em] text-white/30">
            Dôverujú nám lídri z odvetví
          </p>
          <div className="flex items-center gap-10 sm:gap-14">
            {LOGOS.map(({ Icon, label }) => (
              <Icon
                key={label}
                aria-label={label}
                size={20}
                className="text-white/25 transition-colors duration-300 hover:text-white/60"
              />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
