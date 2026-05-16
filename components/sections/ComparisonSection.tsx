// FILE: components/sections/ComparisonSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const AUTO_MS = 4000;

interface Item {
  title:  string;
  sb:     string;
  others: string;
}

const ITEMS: readonly Item[] = [
  {
    title:  "Výsledky vs Prísľuby",
    sb:     "Každý projekt má merateľné KPI. Ak sa cieľ nenapĺňa, vieme prečo.",
    others: "Pekné slová, žiadne čísla. Dizajn bez stratégie.",
  },
  {
    title:  "Komunikácia vs Ticho",
    sb:     "Priamy kontakt, rýchle odpovede, transparentný postup.",
    others: "Týždne čakania. Nejasné termíny. Žiadne aktualizácie.",
  },
  {
    title:  "Unikátnosť vs Šablóna",
    sb:     "Každý web je kodovaný od nuly pre váš biznis.",
    others: "WordPress šablóna s iným logom. 50 rovnakých stránok.",
  },
  {
    title:  "Výkon vs Pomalosť",
    sb:     "PageSpeed 95+. Core Web Vitals zelené. Animácie 60fps.",
    others: "3 sekundy načítania. Bounce rate 70%. Stratené konverzie.",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  ComparisonSection — vertical tab list ↔ paired content panel.
 *  Auto-cycles every 4s; user click overrides + resets the timer.
 * ════════════════════════════════════════════════════════════════════════════ */
export default function ComparisonSection() {
  const [i, setI] = useState(0);
  const lastUserAction = useRef<number>(0);

  useEffect(() => {
    const tick = window.setInterval(() => {
      /* Skip auto-advance if user just clicked (<3s ago) */
      if (performance.now() - lastUserAction.current < 3000) return;
      setI((prev) => (prev + 1) % ITEMS.length);
    }, AUTO_MS);
    return () => window.clearInterval(tick);
  }, []);

  const onPick = (idx: number) => {
    lastUserAction.current = performance.now();
    setI(idx);
  };

  const active = ITEMS[i];

  return (
    <motion.section
      id="comparison"
      aria-label="Porovnanie"
      className="w-full bg-black"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="px-6 md:px-10 py-[140px] max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">

        {/* Tab list */}
        <ul className="flex flex-col">
          {ITEMS.map((item, idx) => {
            const isActive = idx === i;
            return (
              <li key={item.title}>
                <button
                  type="button"
                  data-cursor="link"
                  onClick={() => onPick(idx)}
                  className="w-full text-left transition-all duration-300"
                  style={{
                    fontFamily:    "Syne, sans-serif",
                    fontWeight:    700,
                    fontSize:      "16px",
                    letterSpacing: "0.02em",
                    paddingLeft:   "20px",
                    paddingTop:    "20px",
                    paddingBottom: "20px",
                    borderLeft:    isActive ? "3px solid #00D4FF" : "3px solid transparent",
                    color:         isActive ? "#fff" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {item.title}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Content panel */}
        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0  }}
              exit={{    opacity: 0, x: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr] gap-8 sm:gap-12 items-start"
            >
              {/* SB DESIGN side */}
              <div>
                <div
                  className="mb-4"
                  style={{
                    fontFamily:    "Syne, sans-serif",
                    fontWeight:    700,
                    fontSize:      "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color:         "rgba(0,212,255,0.7)",
                  }}
                >
                  SB DESIGN
                </div>
                <p
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize:   "clamp(16px, 1.3vw, 19px)",
                    lineHeight: 1.6,
                    color:      "rgba(255,255,255,0.85)",
                  }}
                >
                  {active.sb}
                </p>
              </div>

              {/* Divider — desktop only */}
              <div
                aria-hidden
                className="hidden sm:block h-full"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />

              {/* Others side */}
              <div>
                <div
                  className="mb-4"
                  style={{
                    fontFamily:    "Syne, sans-serif",
                    fontWeight:    700,
                    fontSize:      "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color:         "rgba(255,255,255,0.3)",
                  }}
                >
                  Ostatní
                </div>
                <p
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize:   "clamp(16px, 1.3vw, 19px)",
                    lineHeight: 1.6,
                    color:      "rgba(255,255,255,0.4)",
                  }}
                >
                  {active.others}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
