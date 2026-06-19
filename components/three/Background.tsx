"use client";

import { useEffect, useRef } from "react";

// Living, INTERACTIVE aurora background.
//  • 3 driftujúce viachuhové gradienty (CSS keyframes, len translate/opacity),
//  • kurzorový SPOTLIGHT — mäkké svetlo plynule sleduje myš (lerp),
//  • PARALLAX — celé pole sa jemne nakláňa podľa polohy myši.
// PERF: všetko cez `transform` na GPU vrstvách; rAF beží LEN kým sa myš hýbe a sám
// sa zastaví v pokoji; drift sa pozastaví počas scrollu; žiadny `filter: blur`.
export default function Background() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const field = fieldRef.current;
    const spot = spotRef.current;
    if (!root || !field || !spot) return;

    // ── pauza driftu počas scrollu (Safari nesekne) ──
    let scrollTimer = 0;
    const onScroll = () => {
      if (!root.classList.contains("aurora-stop")) root.classList.add("aurora-stop");
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => root.classList.remove("aurora-stop"), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── interakcia s myšou (spotlight + parallax) ──
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPOT = 840;
    const HALF = SPOT / 2;
    let tx = 0.5;
    let ty = 0.5; // cieľ (0..1)
    let cx = 0.5;
    let cy = 0.5; // aktuálne (lerp)
    let raf = 0;
    let running = false;

    const tick = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      const px = (cx - 0.5) * 64;
      const py = (cy - 0.5) * 64;
      field.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      spot.style.transform = `translate3d(${cx * window.innerWidth - HALF}px, ${cy * window.innerHeight - HALF}px, 0)`;
      if (Math.abs(tx - cx) > 0.0004 || Math.abs(ty - cy) > 0.0004) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
      start();
    };

    start(); // usadiť spotlight na stred
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      clearTimeout(scrollTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "#04060c", transform: "translateZ(0)" }}
    >
      {/* jemný statický základ */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(47,107,255,0.07), transparent 60%)" }}
      />

      {/* parallax pole driftujúcich blobov */}
      <div ref={fieldRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        <div
          className="aurora-blob absolute -left-[16%] -top-[20%] h-[64vh] w-[64vh] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(47,107,255,0.42) 0%, rgba(47,107,255,0.16) 38%, transparent 72%)",
            willChange: "transform",
            animation: "aurora-a 26s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob absolute -right-[14%] -top-[6%] h-[56vh] w-[56vh] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(24,214,255,0.34) 0%, rgba(24,214,255,0.12) 40%, transparent 72%)",
            willChange: "transform, opacity",
            animation: "aurora-b 21s ease-in-out infinite, aurora-breathe 16s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob absolute bottom-[-22%] left-[16%] h-[70vh] w-[70vh] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(120,77,255,0.36) 0%, rgba(120,77,255,0.13) 40%, transparent 72%)",
            willChange: "transform",
            animation: "aurora-c 30s ease-in-out infinite",
          }}
        />
      </div>

      {/* kurzorový spotlight (sleduje myš) */}
      <div
        ref={spotRef}
        className="absolute left-0 top-0 rounded-full"
        style={{
          width: 840,
          height: 840,
          willChange: "transform",
          background:
            "radial-gradient(circle, rgba(110,160,255,0.30) 0%, rgba(47,107,255,0.11) 36%, transparent 64%)",
        }}
      />
    </div>
  );
}
