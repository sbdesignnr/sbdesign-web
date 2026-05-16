// FILE: components/sections/StatsSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Stat {
  /** Target numeric value to count toward */
  target: number;
  /** Suffix appended after the number (e.g. "+", "%", "×") */
  suffix: string;
  /** Optional prefix (e.g. "0.") */
  prefix?: string;
  /** Display label under the number */
  label: string;
}

const STATS: readonly Stat[] = [
  { target: 47,  suffix: "+", label: "Dokončených projektov"           },
  { target: 100, suffix: "%", label: "Klientov odporúča ďalej"         },
  { target: 3,   suffix: "×", label: "Priemerný rast konverzií klientov" },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  StatNumber — IntersectionObserver-gated count-up.
 *  Runs once, then disconnects. easeOutCubic over 2000ms.
 * ════════════════════════════════════════════════════════════════════════════ */
function StatNumber({ target, suffix, prefix = "" }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting || fired.current) return;
        fired.current = true;

        const startTs  = performance.now();
        const duration = 2000;
        let raf = 0;

        const tick = (ts: number) => {
          const t     = Math.min(1, (ts - startTs) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(eased * target));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();

        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "Syne, sans-serif",
        fontWeight: 900,
        fontSize:   "clamp(56px, 8vw, 120px)",
        lineHeight: 1,
        color:      "#fff",
        letterSpacing: "-0.025em",
      }}
    >
      {prefix}{n}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <motion.section
      id="stats"
      aria-label="Štatistiky"
      className="w-full"
      style={{ backgroundColor: "rgb(5,10,20)" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="px-6 md:px-10 py-[140px] max-w-[1400px] mx-auto">

        <p
          className="text-center mx-auto mb-24"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 400,
            fontStyle:  "italic",
            fontSize:   "clamp(18px, 2vw, 28px)",
            lineHeight: 1.5,
            color:      "rgba(255,255,255,0.55)",
            maxWidth:   "640px",
          }}
        >
          Čísla, ktoré hovoria za nás. Výsledky klientov, nie prísľuby.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-start text-center">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-6">
              <StatNumber {...s} />
              <div
                style={{
                  fontFamily:    "Syne, sans-serif",
                  fontWeight:    700,
                  fontSize:      "12px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color:         "rgba(255,255,255,0.4)",
                  maxWidth:      "240px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
