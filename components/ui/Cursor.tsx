"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor: a small dot + a lagging ring.
 * - Grows over [data-cursor] / links / buttons.
 * - Shows a label when an element has [data-cursor-label].
 * Desktop (fine pointer) only; disabled for reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const xLabel = gsap.quickTo(label, "x", { duration: 0.3, ease: "power3" });
    const yLabel = gsap.quickTo(label, "y", { duration: 0.3, ease: "power3" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      xLabel(e.clientX);
      yLabel(e.clientY);
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const interactiveSel = 'a, button, [data-cursor], input, textarea, [role="button"]';

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(interactiveSel) as HTMLElement | null;
      if (!t) return;
      const labelText = t.getAttribute("data-cursor-label");
      gsap.to(ring, { scale: 2.4, borderColor: "rgba(47,107,255,0.9)", duration: 0.35, ease: "power3" });
      gsap.to(dot, { scale: 0.4, duration: 0.35, ease: "power3" });
      if (labelText) {
        label.textContent = labelText;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.3, ease: "power3" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(interactiveSel) as HTMLElement | null;
      if (!t) return;
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.4)", duration: 0.35, ease: "power3" });
      gsap.to(dot, { scale: 1, duration: 0.35, ease: "power3" });
      gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.25 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut, true);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut, true);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full"
        style={{
          width: 34,
          height: 34,
          marginLeft: -17,
          marginTop: -17,
          border: "1px solid rgba(150,180,255,0.55)",
          opacity: 0,
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full"
        style={{ width: 6, height: 6, marginLeft: -3, marginTop: -3, background: "#eef2fb", opacity: 0, willChange: "transform" }}
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 font-mono text-[10px] tracking-[0.2em] uppercase text-white"
        style={{ transform: "translate(18px, 14px)", opacity: 0, willChange: "transform" }}
      />
    </div>
  );
}
