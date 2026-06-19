"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function IntroLoader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Only on first visit per session
    if (typeof window !== "undefined" && sessionStorage.getItem("sb-intro-seen")) {
      setShow(false);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 1 : 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("sb-intro-seen", "1");
        setTimeout(() => setShow(false), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-line-strong">
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 60%, var(--color-cyan))" }}
              />
              <span className="relative font-display text-2xl font-extrabold text-white">SB</span>
            </span>
            <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-marble-muted">SB Design Studio</span>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 flex w-[min(80vw,420px)] -translate-x-1/2 flex-col gap-3">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-marble-muted">Načítavam</span>
              <span className="font-display text-3xl font-extrabold tabular-nums text-marble">{count}</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-line">
              <motion.div
                className="h-full"
                style={{ width: `${count}%`, background: "linear-gradient(90deg, var(--color-azure), var(--color-cyan))" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
