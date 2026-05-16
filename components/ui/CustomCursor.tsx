// FILE: components/ui/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════════════════════════════════════
 *  CustomCursor — 8px cyan dot that lerps toward the real cursor.
 *  On hover over [data-cursor="link"] (or <a>, <button>) the dot expands
 *  into a 40px hollow ring with mix-blend-difference so it inverts
 *  whatever sits underneath (white text → cyan invert, dark bg → light).
 *
 *  Disabled on touch devices automatically — we detect `pointer: coarse`
 *  via matchMedia and bail out before mounting any listeners.
 * ════════════════════════════════════════════════════════════════════════════ */
export default function CustomCursor() {
  const dotRef          = useRef<HTMLDivElement>(null);
  const [enabled, setEn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    /* Touch / coarse-pointer devices get the native cursor */
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEn(true);

    const dot   = dotRef.current;
    if (!dot) return;

    const real  = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const lerp  = { x: real.x,                y: real.y               };
    const state = { scale: 1, hover: false };
    let raf = 0;

    const tick = () => {
      /* 0.12 lerp → ~5 frames to reach target, signature "premium" lag */
      lerp.x += (real.x - lerp.x) * 0.18;
      lerp.y += (real.y - lerp.y) * 0.18;
      dot.style.transform =
        `translate3d(${lerp.x - 4}px, ${lerp.y - 4}px, 0) scale(${state.scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      real.x = e.clientX;
      real.y = e.clientY;
    };

    /* Event-delegated hover detection — one listener instead of N */
    const isHoverable = (el: EventTarget | null): boolean => {
      if (!(el instanceof Element)) return false;
      return !!el.closest('a, button, [data-cursor="link"], input, textarea, select');
    };
    const onOver = (e: MouseEvent) => {
      const hover = isHoverable(e.target);
      if (hover === state.hover) return;
      state.hover = hover;
      state.scale = hover ? 5 : 1;          // 8px → 40px
      dot.classList.toggle("cursor-ring", hover);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        html, body { cursor: none; }
        a, button, [data-cursor="link"], input, textarea, select { cursor: none; }
        .sb-cursor {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px;
          border-radius: 9999px;
          background: var(--brand-cyan, #00D4FF);
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          will-change: transform;
          transition: background 0.25s ease, border 0.25s ease;
        }
        .sb-cursor.cursor-ring {
          background: transparent;
          box-shadow: inset 0 0 0 1px var(--brand-cyan, #00D4FF);
        }
      `}</style>
      <div ref={dotRef} className="sb-cursor" aria-hidden />
    </>
  );
}
