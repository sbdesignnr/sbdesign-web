// FILE: components/sections/VisionSection.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE_CYCLE = [0.76, 0, 0.24, 1] as const;
const EASE       = [0.16, 1, 0.3, 1] as const;

const WORDS = ["pretvárame", "navrhujeme", "kódujeme", "optimalizujeme"] as const;
const CYCLE_MS = 2500;

/* ════════════════════════════════════════════════════════════════════════════
 *  VisionSection — TitanGate signature cycling-word block.
 *  Word exits up (clipped by overflow:hidden), next enters from below.
 *  AnimatePresence with mode="popLayout" keeps both children rendered
 *  during the swap, so the height doesn't collapse mid-transition.
 * ════════════════════════════════════════════════════════════════════════════ */
export default function VisionSection() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setI((prev) => (prev + 1) % WORDS.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.section
      id="vision"
      aria-label="Vision"
      className="w-full bg-black"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="px-6 md:px-10 py-[120px] max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-12 md:gap-20 items-start">

        {/* LEFT — italic muted intro */}
        <p
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 400,
            fontStyle:  "italic",
            fontSize:   "clamp(18px, 2vw, 28px)",
            lineHeight: 1.5,
            color:      "rgba(255,255,255,0.55)",
            maxWidth:   "560px",
          }}
        >
          Sú weby, ktoré existujú — a sú weby, ktoré konvertujú. My nerobíme
          kompromisy. Každý pixel má účel, každá animácia má dôvod.
        </p>

        {/* RIGHT — cycling block */}
        <div>
          {/* Static prefix */}
          <div
            style={{
              fontFamily:    "Syne, sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(40px, 5.5vw, 88px)",
              lineHeight:    0.92,
              letterSpacing: "-0.025em",
              color:         "#fff",
            }}
          >
            Každý projekt
          </div>

          {/* Cycling word — fixed-height clip container */}
          <div
            className="relative overflow-hidden mt-1"
            style={{
              height:        "1em",
              fontFamily:    "Syne, sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(48px, 7vw, 120px)",
              lineHeight:    0.9,
              letterSpacing: "-0.025em",
              color:         "#00D4FF",
              willChange:    "transform",
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={WORDS[i]}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: EASE_CYCLE }}
                className="absolute inset-0 block"
              >
                {WORDS[i]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Trailing line */}
          <div
            className="mt-6"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 400,
              fontSize:   "clamp(18px, 2vw, 28px)",
              color:      "rgba(255,255,255,0.5)",
              lineHeight: 1.4,
            }}
          >
            od základov, nie od šablóny.
          </div>
        </div>
      </div>
    </motion.section>
  );
}
