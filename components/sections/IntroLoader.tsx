// FILE: components/sections/IntroLoader.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ════════════════════════════════════════════════════════════════════════════
 *  IntroLoader — first-paint 3.2s sequence:
 *    0.00s  top-left version stamp fades in
 *    0.10s  typewriter "Načítavam..." (40ms per char)
 *    1.20s  000 → 100 counter ramps via easeOut
 *    ~2.8s  whole block slides up off-screen
 *
 *  Body gets `data-loaded="true"` when finished — other components
 *  (nav, hero) gate their entrance animations on this attribute.
 * ════════════════════════════════════════════════════════════════════════════ */
const TYPE = "Načítavam";
const CHAR_DELAY_MS = 40;

export default function IntroLoader() {
  const [typed,   setTyped]   = useState("");
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  /* ── Typewriter ─────────────────────────────────────────────────────── */
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setTyped(TYPE.slice(0, i) + (i < TYPE.length ? "" : "..."));
      if (i >= TYPE.length) window.clearInterval(id);
    }, CHAR_DELAY_MS);
    return () => window.clearInterval(id);
  }, []);

  /* ── Counter 0 → 100, easeOut over 1.6s, starts at 1.2s ─────────────── */
  useEffect(() => {
    const start    = performance.now() + 1200;
    const duration = 1600;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      /* easeOutCubic — premium "snappy start, smooth end" curve */
      const eased = 1 - Math.pow(1 - t, 3);
      setPercent(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else       window.setTimeout(() => setExiting(true), 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Set body attribute + unmount once slide-up completes ──────────── */
  useEffect(() => {
    if (!exiting) return;
    const t = window.setTimeout(() => {
      document.body.setAttribute("data-loaded", "true");
      setVisible(false);
    }, 700);
    return () => window.clearTimeout(t);
  }, [exiting]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ y: 0 }}
          animate={exiting ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* Top-left version stamp */}
          <div
            className="absolute top-6 left-6"
            style={{
              fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize:      "11px",
              color:         "rgba(0,212,255,0.6)",
              letterSpacing: "0.1em",
            }}
          >
            SB_DESIGN / v2.0
          </div>

          {/* Center stack */}
          <div className="flex flex-col items-center gap-6">
            <div
              style={{
                fontFamily:    "Syne, sans-serif",
                fontSize:      "13px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color:         "#fff",
                fontWeight:    700,
              }}
            >
              {typed}
            </div>
            <div
              style={{
                fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize:      "11px",
                letterSpacing: "0.2em",
                color:         "rgba(0,212,255,0.4)",
              }}
            >
              {String(percent).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
