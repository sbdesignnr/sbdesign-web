"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a numeric value when scrolled into view.
 * Keeps any non-numeric prefix/suffix (e.g. "3×", "98", "100%").
 */
export default function Counter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const done = useRef(false);

  const match = value.match(/([^\d]*)(\d+(?:\.\d+)?)(.*)/);

  useEffect(() => {
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (reduce) {
            setDisplay(`${prefix}${num}${suffix}`);
            return;
          }
          const duration = 1400;
          const startT = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - startT) / duration);
            const eased = 1 - Math.pow(1 - p, 4);
            const current = (target * eased).toFixed(decimals);
            setDisplay(`${prefix}${current}${suffix}`);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(`${prefix}${num}${suffix}`);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, match]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
