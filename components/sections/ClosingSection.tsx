// FILE: components/sections/ClosingSection.tsx
"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ════════════════════════════════════════════════════════════════════════════
 *  ClosingSection — final CTA. Massive paired headline + body + bordered
 *  pill button that subtly expands its letter-spacing on hover.
 * ════════════════════════════════════════════════════════════════════════════ */
export default function ClosingSection() {
  return (
    <section
      id="contact"
      aria-label="Začať projekt"
      className="relative w-full min-h-screen bg-black flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 1, ease: EASE }}
        className="px-6 md:px-10 py-[120px] max-w-[1200px] mx-auto flex flex-col items-center text-center"
      >

        {/* Headline */}
        <h2
          style={{
            fontFamily:    "Syne, sans-serif",
            fontWeight:    900,
            fontSize:      "clamp(72px, 10vw, 180px)",
            lineHeight:    0.88,
            letterSpacing: "-0.04em",
            color:         "#fff",
            textTransform: "none",
          }}
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 1, delay: 0.05, ease: EASE }}
            >
              Prémiový web.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              Váš výsledok.
            </motion.span>
          </span>
        </h2>

        {/* Body */}
        <p
          className="mt-12"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 400,
            fontSize:   "clamp(15px, 1.2vw, 18px)",
            lineHeight: 1.7,
            color:      "rgba(255,255,255,0.45)",
            maxWidth:   "480px",
          }}
        >
          SB DESIGN nie je pre každého. A tak to má byť. Tí, ktorí nás vyberú,
          žijú výsledkami.
        </p>

        {/* CTA */}
        <a
          href="mailto:samuel@sbdesign.sk"
          data-cursor="link"
          className="mt-10 transition-all duration-300 ease-out"
          style={{
            fontFamily:    "Syne, sans-serif",
            fontWeight:    700,
            fontSize:      "13px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#00D4FF",
            border:        "1px solid rgba(0,212,255,0.5)",
            background:    "transparent",
            padding:       "18px 48px",
            borderRadius:  "9999px",
            display:       "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background    = "rgba(0,212,255,0.06)";
            e.currentTarget.style.borderColor   = "#00D4FF";
            e.currentTarget.style.letterSpacing = "0.25em";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background    = "transparent";
            e.currentTarget.style.borderColor   = "rgba(0,212,255,0.5)";
            e.currentTarget.style.letterSpacing = "0.2em";
          }}
        >
          Začať projekt
        </a>
      </motion.div>
    </section>
  );
}
