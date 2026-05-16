// FILE: components/sections/StatementSection.tsx
"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ════════════════════════════════════════════════════════════════════════════
 *  StatementSection — TitanGate "Invitation" section.
 *  Two-column: left = eyebrow + huge headline, right = body + inline CTA.
 *  Whole block scroll-fades in once.
 * ════════════════════════════════════════════════════════════════════════════ */
export default function StatementSection() {
  return (
    <motion.section
      id="invitation"
      aria-label="Prístup na pozvanie"
      className="w-full bg-black"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="px-6 md:px-10 py-[160px] max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* LEFT */}
        <div>
          <div
            className="mb-10"
            style={{
              fontFamily:    "Syne, sans-serif",
              fontSize:      "11px",
              fontWeight:    700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "rgba(0,212,255,0.7)",
            }}
          >
            Prístup na pozvanie
          </div>

          <h2
            style={{
              fontFamily:    "Syne, sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(40px, 5.5vw, 88px)",
              lineHeight:    0.92,
              letterSpacing: "-0.025em",
              color:         "#fff",
            }}
          >
            Výsledky, ktoré<br />hovoria za seba.
          </h2>
        </div>

        {/* RIGHT */}
        <div>
          <p
            style={{
              fontFamily:  "Syne, sans-serif",
              fontWeight:  400,
              fontSize:    "clamp(15px, 1.2vw, 18px)",
              lineHeight:  1.7,
              color:       "rgba(255,255,255,0.65)",
              maxWidth:    "520px",
            }}
          >
            Nepracujeme s každým. Vyberáme klientov, ktorí chápu, že prémiový
            web nie je náklad — je to investícia, ktorá pracuje za vás 24 hodín
            denne.
          </p>

          <div className="mt-12">
            <a
              href="#contact"
              data-cursor="link"
              className="group inline-flex items-center gap-2 transition-colors duration-200"
              style={{
                fontFamily:     "Syne, sans-serif",
                fontWeight:     700,
                fontSize:       "15px",
                color:          "#fff",
                textDecoration: "none",
                borderBottom:   "1px solid transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderBottom = "1px solid #fff")}
              onMouseLeave={(e) => (e.currentTarget.style.borderBottom = "1px solid transparent")}
            >
              Začať projekt
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
