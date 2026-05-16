// FILE: components/sections/ProcessSection.tsx
"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Step {
  num:   string;
  title: string;
  body:  string;
}

const STEPS: readonly Step[] = [
  { num: "01", title: "Konzultácia", body: "Bezplatné stretnutie. Pochopíme váš biznis, ciele a konkurenciu." },
  { num: "02", title: "Návrh",       body: "Unikátny dizajn na mieru. Žiadne šablóny. Každý element má účel." },
  { num: "03", title: "Vývoj",       body: "Čistý kód, rýchle načítanie, plynulé animácie. Testujeme na každom zariadení." },
  { num: "04", title: "Spustenie",   body: "Odovzdanie, školenie a podpora. Váš web pracuje za vás od prvého dňa." },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-label="Proces"
      className="w-full bg-black"
    >
      <div className="px-6 md:px-10 py-[140px] max-w-[1400px] mx-auto">

        {/* Eyebrow + headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-24"
        >
          <div
            style={{
              fontFamily:    "Syne, sans-serif",
              fontWeight:    700,
              fontSize:      "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "rgba(0,212,255,0.7)",
              marginBottom:  "32px",
            }}
          >
            Proces
          </div>
          <h2
            style={{
              fontFamily:    "Syne, sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(40px, 6vw, 96px)",
              lineHeight:    0.92,
              letterSpacing: "-0.025em",
              color:         "#fff",
              maxWidth:      "900px",
            }}
          >
            Od nápadu k výsledku.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <div
                aria-hidden
                className="w-full"
                style={{
                  height:           "1px",
                  backgroundColor:  "rgba(255,255,255,0.08)",
                }}
              />
              <div
                style={{
                  fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize:      "11px",
                  letterSpacing: "0.2em",
                  color:         "rgba(0,212,255,0.5)",
                }}
              >
                {s.num} /
              </div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize:   "20px",
                  color:      "#fff",
                  marginTop:  "8px",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 400,
                  fontSize:   "14px",
                  lineHeight: 1.6,
                  color:      "rgba(255,255,255,0.5)",
                  marginTop:  "8px",
                }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
