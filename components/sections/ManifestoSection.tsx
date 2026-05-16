// FILE: components/sections/ManifestoSection.tsx
"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ════════════════════════════════════════════════════════════════════════════
 *  Each element on the top row has its own style — the chaos IS the design.
 *  Splitting them into a config makes the JSX dense but readable, and lets
 *  the visual hierarchy be tuned without editing markup.
 * ════════════════════════════════════════════════════════════════════════════ */
interface Frag {
  text:   string;
  family: "syne" | "mono";
  weight: 400 | 700 | 900;
  italic?: boolean;
  size:   string;
  color:  string;
}

const FRAGMENTS: readonly Frag[] = [
  { text: ">>>",         family: "mono", weight: 400, size: "13px", color: "rgba(255,255,255,0.25)" },
  { text: "PRÉMIUM",     family: "syne", weight: 900, size: "48px", color: "#fff" },
  { text: "_",           family: "mono", weight: 400, size: "48px", color: "rgba(255,255,255,0.2)" },
  { text: "web",         family: "syne", weight: 400, italic: true, size: "36px", color: "rgba(255,255,255,0.4)" },
  { text: "[01]",        family: "mono", weight: 400, size: "11px", color: "rgba(0,212,255,0.5)" },
  { text: "nie je",      family: "syne", weight: 400, size: "28px", color: "rgba(255,255,255,0.3)" },
  { text: "_",           family: "mono", weight: 400, size: "32px", color: "rgba(255,255,255,0.2)" },
  { text: "luxus",       family: "syne", weight: 900, size: "48px", color: "#fff" },
  { text: "[?]",         family: "mono", weight: 400, size: "11px", color: "rgba(255,255,255,0.3)" },
  { text: "vyžadovaný",  family: "syne", weight: 400, italic: true, size: "13px", color: "rgba(255,255,255,0.2)" },
];

const fontFor = (f: Frag["family"]) =>
  f === "mono"
    ? "ui-monospace, SFMono-Regular, Menlo, monospace"
    : "Syne, sans-serif";

export default function ManifestoSection() {
  return (
    <motion.section
      id="manifesto"
      aria-label="Manifesto"
      className="w-full"
      style={{ background: "linear-gradient(180deg, #000 0%, rgb(3,6,18) 100%)" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="px-6 md:px-10 py-[160px] max-w-[1200px] mx-auto flex flex-col items-center">

        {/* Typographic chaos row */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-3 mb-24 max-w-[1100px]">
          {FRAGMENTS.map((f, i) => (
            <motion.span
              key={`${f.text}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              style={{
                fontFamily:    fontFor(f.family),
                fontWeight:    f.weight,
                fontStyle:     f.italic ? "italic" : "normal",
                fontSize:      f.size,
                color:         f.color,
                lineHeight:    1,
                letterSpacing: f.family === "syne" ? "-0.01em" : "0.05em",
              }}
            >
              {f.text}
            </motion.span>
          ))}
        </div>

        {/* Body */}
        <div className="flex flex-col gap-8 max-w-[600px] text-center">
          <p
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 400,
              fontSize:   "clamp(17px, 1.5vw, 22px)",
              lineHeight: 1.75,
              color:      "rgba(255,255,255,0.6)",
            }}
          >
            Je to nástroj. Ten najvýkonnejší, čo váš biznis môže mať. Každý
            deň bez správneho webu je deň, keď váš konkurent predbehne
            zákazníka, ktorý hľadal vás.
          </p>
          <p
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 400,
              fontSize:   "clamp(17px, 1.5vw, 22px)",
              lineHeight: 1.75,
              color:      "rgba(255,255,255,0.6)",
            }}
          >
            Pracujeme len s klientmi, ktorí to chápu. Výsledok potom nie je
            web — je to systém, ktorý pracuje za vás.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
