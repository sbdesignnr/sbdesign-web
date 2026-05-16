"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * EventHorizon — Reflect-style black hole as a block element.
 *
 * Internal stacking (same stacking context, parent is `relative`):
 *   z-0  Background beams  (absolute, horizontal light rays)
 *   z-10 Ring container    (relative, in flow)
 *        ├─ Outer glow     absolute inset-0, blur-[40px], animated
 *        ├─ Sharp corona   absolute inset-0, border-[2px] white, box-shadow animated
 *        └─ Black void     absolute inset-[2px]
 *
 * GPU policy: only `scale` and `opacity` animated.
 * All animated nodes: transform-gpu + will-change-transform.
 */
export default function EventHorizon() {
  const outerGlowRef = useRef<HTMLDivElement>(null);
  const coronaRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Outer glow — big slow pulse
    if (outerGlowRef.current) {
      gsap.to(outerGlowRef.current, {
        scale:    1.25,
        opacity:  0.55,
        duration: 4,
        repeat:   -1,
        yoyo:     true,
        ease:     "sine.inOut",
      });
    }
    // Sharp corona — subtle breathing, slightly offset phase
    if (coronaRef.current) {
      gsap.to(coronaRef.current, {
        scale:    1.04,
        opacity:  0.82,
        duration: 3.5,
        repeat:   -1,
        yoyo:     true,
        ease:     "sine.inOut",
        delay:    0.6,
      });
    }
  });

  return (
    /* Outer: block element — establishes height in document flow.
       `relative` creates the stacking context for z-0 / z-10 children.
       NO overflow-hidden so horizontal beams bleed to section edges.    */
    <div className="relative flex h-[320px] w-full items-center justify-center">

      {/* ── 1. Background Beams ── z-0 ──────────────────────────────────────
          Three layers stacked at the same Y-center, widths decrease for
          the "hotspot" effect: ambient → sharp cyan → pure-white thread.   */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Ambient haze */}
        <div className="absolute h-[80px] w-[80vw] rounded-[100%] bg-blue-600/20 blur-[80px]" />
        {/* Sharp cyan beam */}
        <div className="absolute h-[2px] w-[60vw] rounded-[100%] bg-cyan-300/80 blur-[2px]" />
        {/* White hotspot thread */}
        <div className="absolute h-[1px] w-[30vw] bg-white blur-[1px]" />
      </div>

      {/* ── 2. Event Horizon Ring ── z-10 ───────────────────────────────────
          Relative so it stays centered in the flex parent (document flow).  */}
      <div className="relative z-10 flex h-[320px] w-[320px] items-center justify-center">

        {/* Outer Glow — large diffuse blue corona */}
        <div
          ref={outerGlowRef}
          aria-hidden
          className="absolute inset-0 rounded-full bg-blue-500/30 transform-gpu will-change-transform"
          style={{ filter: "blur(40px)" }}
        />

        {/* Sharp Corona Ring — the KEY element.
            border-[2px] border-white/90 creates the crisp white ring.
            box-shadow adds the electric blue halo outside AND inside.      */}
        <div
          ref={coronaRef}
          aria-hidden
          className="absolute inset-0 rounded-full border-[2px] border-white/90 transform-gpu will-change-transform"
          style={{
            boxShadow:
              "0 0 50px 15px rgba(0,85,255,0.7), 0 0 100px 30px rgba(0,60,220,0.35), inset 0 0 30px 5px rgba(0,100,255,0.3)",
          }}
        />

        {/* The Black Void — slightly inset so only the border ring is visible */}
        <div
          aria-hidden
          className="absolute rounded-full bg-[#030508]"
          style={{ inset: "2px" }}
        />

      </div>
    </div>
  );
}
