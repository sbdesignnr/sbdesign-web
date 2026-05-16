"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════════
 *  useTransparentImage — Canvas API pixel-stripping hook
 *
 *  Runs ONCE on mount: loads the source PNG, luminance-keys the black
 *  background to alpha, then exports a transparent PNG blob URL.
 *  After this hook returns, the browser composites a plain <img> at native
 *  GPU speed — no per-frame canvas, no WebGL context lifecycle.
 *
 *  Why this beats mix-blend-mode for the sandwich:
 *    - mix-blend-mode forces a stacking context + compositor layer per frame
 *    - real alpha lets <img> sit between two text layers cleanly with no
 *      color contamination from the gradient underneath
 * ════════════════════════════════════════════════════════════════════════════ */
function useTransparentImage(src: string, threshold = 45): string | null {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      /* Rec. 601 luma — gives a perceptually-correct brightness value.
         Pixels darker than `threshold` get a quadratic alpha falloff so the
         hand edges blend softly into transparency instead of hard-clipping. */
      for (let i = 0; i < d.length; i += 4) {
        const lum = (d[i] * 299 + d[i + 1] * 587 + d[i + 2] * 114) / 1000;
        if (lum < threshold) {
          d[i + 3] = Math.round(Math.pow(lum / threshold, 2) * 255);
        }
      }
      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          objectUrl = URL.createObjectURL(blob);
          setBlobUrl(objectUrl);
        }
      }, "image/png");
    };
    img.src = src;
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, threshold]);

  return blobUrl;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  Typography — both text layers share identical metrics so the outline
 *  traces the gradient pixel-perfectly. Any divergence breaks the sandwich.
 *  `whiteSpace: nowrap` keeps each word on one line at all viewports.
 * ════════════════════════════════════════════════════════════════════════════ */
const fillTextStyle: React.CSSProperties = {
  fontFamily:           "Syne, sans-serif",
  fontSize:             "clamp(120px, 18vw, 320px)",
  fontWeight:           900,
  lineHeight:           0.88,
  letterSpacing:        "-0.03em",
  textTransform:        "uppercase",
  background:           "linear-gradient(160deg, #FFFFFF 0%, #FFFFFF 25%, #4DA6FF 55%, #0057FF 75%, #00D4FF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor:  "transparent",
  backgroundClip:       "text",
  filter:               "drop-shadow(0 0 40px rgba(0,87,255,0.6)) drop-shadow(0 0 80px rgba(0,212,255,0.25))",
  userSelect:           "none",
  pointerEvents:        "none",
  whiteSpace:           "nowrap",
};

const outlineTextStyle: React.CSSProperties = {
  fontFamily:          "Syne, sans-serif",
  fontSize:            "clamp(120px, 18vw, 320px)",
  fontWeight:          900,
  lineHeight:          0.88,
  letterSpacing:       "-0.03em",
  textTransform:       "uppercase",
  WebkitTextFillColor: "transparent",
  WebkitTextStroke:    "1px rgba(255, 255, 255, 0.18)",
  userSelect:          "none",
  pointerEvents:       "none",
  whiteSpace:          "nowrap",
};

/* ════════════════════════════════════════════════════════════════════════════
 *  LightningBolt — procedural SVG, recursive midpoint displacement
 *
 *  Algorithm: subdivide the line between two fingertips N times; at each
 *  midpoint perturb perpendicularly by a random amount that decays with
 *  depth. This is the canonical procedural-lightning recipe (Reed, GPU
 *  Gems 2). One bolt + two branches + a wide blue glow underneath.
 *
 *  Render strategy: setAttribute on existing <path> nodes per rAF — no
 *  React reconciliation in the hot loop. Flicker rhythm is irregular by
 *  design (Math.random) so the eye reads it as electricity, not animation.
 * ════════════════════════════════════════════════════════════════════════════ */
interface LightningProps {
  active: boolean;
}

function LightningBolt({ active }: LightningProps) {
  const svgRef     = useRef<SVGSVGElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);
  const branchRef1 = useRef<SVGPathElement>(null);
  const branchRef2 = useRef<SVGPathElement>(null);
  const glowRef    = useRef<SVGPathElement>(null);
  const rafRef     = useRef<number>(0);

  const generateLightningPoints = (
    x1: number, y1: number,
    x2: number, y2: number,
    depth: number,
    roughness = 0.5,
  ): Array<[number, number]> => {
    if (depth === 0) return [[x1, y1], [x2, y2]];

    const midX   = (x1 + x2) / 2;
    const midY   = (y1 + y2) / 2;
    const dx     = x2 - x1;
    const dy     = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);

    /* Perpendicular offset → jagged silhouette. Roughness halves per
       recursion so the shape stays coherent at large scale.            */
    const offset = (Math.random() - 0.5) * length * roughness;
    const perpX  = -dy / length;
    const perpY  =  dx / length;

    const newMidX = midX + perpX * offset;
    const newMidY = midY + perpY * offset;

    const left  = generateLightningPoints(x1, y1, newMidX, newMidY, depth - 1, roughness * 0.65);
    const right = generateLightningPoints(newMidX, newMidY, x2, y2, depth - 1, roughness * 0.65);

    return [...left.slice(0, -1), ...right];
  };

  const pointsToPath = (points: Array<[number, number]>): string => {
    if (points.length === 0) return "";
    return points.reduce(
      (acc, [x, y], i) => (i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`),
      "",
    );
  };

  useEffect(() => {
    if (!active || !svgRef.current || !pathRef.current) return;

    /* Fingertip positions as % of SVG viewport.
       Tune these multipliers if the bolt origin/target drifts off after
       a future image swap.                                              */
    const getCoords = () => {
      const svg = svgRef.current!;
      const w = svg.clientWidth;
      const h = svg.clientHeight;
      return {
        x1: w * 0.395, y1: h * 0.50,
        x2: w * 0.520, y2: h * 0.48,
      };
    };

    let isVisible      = true;
    let flickerTimeout = 0;

    const scheduleFlicker = () => {
      if (!active) return;

      /* Visible burst: 2–5 frames @ 60fps = 33–83ms. Real lightning
         arcs last 20–80ms which puts us right in the perceptual sweet
         spot for "flash".                                              */
      const visibleFrames = Math.floor(2 + Math.random() * 4);
      isVisible = true;
      let drawn = 0;

      const drawFrame = () => {
        if (!pathRef.current || !active) return;

        const { x1, y1, x2, y2 } = getCoords();

        if (isVisible && drawn < visibleFrames) {
          const points = generateLightningPoints(x1, y1, x2, y2, 5, 0.45);
          const d      = pointsToPath(points);

          pathRef.current.setAttribute("d", d);
          glowRef.current?.setAttribute("d", d);
          pathRef.current.setAttribute("opacity", (0.7 + Math.random() * 0.3).toString());
          glowRef.current?.setAttribute("opacity", (0.15 + Math.random() * 0.2).toString());

          /* Branch 1 — splits at ~28 % along the bolt, falls downward */
          if (branchRef1.current) {
            const branchStart = points[Math.floor(points.length * 0.28)];
            const branchEnd: [number, number] = [
              branchStart[0] + (Math.random() - 0.3) * 80,
              branchStart[1] + 30 + Math.random() * 50,
            ];
            const bPoints = generateLightningPoints(
              branchStart[0], branchStart[1],
              branchEnd[0],   branchEnd[1],   3, 0.5,
            );
            branchRef1.current.setAttribute("d", pointsToPath(bPoints));
            branchRef1.current.setAttribute("opacity", (0.3 + Math.random() * 0.3).toString());
          }

          /* Branch 2 — splits at ~62 % along the bolt, rises upward */
          if (branchRef2.current) {
            const branchStart = points[Math.floor(points.length * 0.62)];
            const branchEnd: [number, number] = [
              branchStart[0] + (Math.random() - 0.7) * 70,
              branchStart[1] - 20 - Math.random() * 40,
            ];
            const bPoints = generateLightningPoints(
              branchStart[0], branchStart[1],
              branchEnd[0],   branchEnd[1],   3, 0.5,
            );
            branchRef2.current.setAttribute("d", pointsToPath(bPoints));
            branchRef2.current.setAttribute("opacity", (0.2 + Math.random() * 0.25).toString());
          }

          drawn++;
          rafRef.current = requestAnimationFrame(drawFrame);
        } else {
          /* Dark gap between flashes — 60–200ms random pause */
          pathRef.current?.setAttribute("opacity", "0");
          glowRef.current?.setAttribute("opacity", "0");
          branchRef1.current?.setAttribute("opacity", "0");
          branchRef2.current?.setAttribute("opacity", "0");

          flickerTimeout = window.setTimeout(
            scheduleFlicker,
            60 + Math.random() * 140,
          );
        }
      };

      rafRef.current = requestAnimationFrame(drawFrame);
    };

    flickerTimeout = window.setTimeout(
      scheduleFlicker,
      80 + Math.random() * 120,
    );

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(flickerTimeout);
      pathRef.current?.setAttribute("opacity", "0");
      glowRef.current?.setAttribute("opacity", "0");
      branchRef1.current?.setAttribute("opacity", "0");
      branchRef2.current?.setAttribute("opacity", "0");
    };
  }, [active]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 25 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="lightning-core-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Wide blue halo behind the bolt */}
      <path
        ref={glowRef}
        stroke="#00AAFF"
        strokeWidth="8"
        fill="none"
        opacity="0"
        strokeLinecap="round"
        filter="url(#lightning-core-glow)"
      />

      {/* Hairline branches */}
      <path
        ref={branchRef1}
        stroke="#88DDFF"
        strokeWidth="1"
        fill="none"
        opacity="0"
        strokeLinecap="round"
        filter="url(#lightning-glow)"
      />
      <path
        ref={branchRef2}
        stroke="#88DDFF"
        strokeWidth="1"
        fill="none"
        opacity="0"
        strokeLinecap="round"
        filter="url(#lightning-glow)"
      />

      {/* White-hot main bolt */}
      <path
        ref={pathRef}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        fill="none"
        opacity="0"
        strokeLinecap="round"
        filter="url(#lightning-glow)"
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  HERO FORGE
 * ════════════════════════════════════════════════════════════════════════════ */
export default function HeroForge() {
  const handsRef       = useRef<HTMLImageElement>(null);
  const transparentSrc = useTransparentImage("/michelangelo_touch.png");

  /* Mirror hover state into a ref so the polling closure inside the hover
     useGSAP can read the latest value without rebinding.                  */
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef              = useRef(false);

  /* ── Idle glitch burst — fires every 4–7s, total ~320ms ───────────────
   *  Background ambient nervousness. Coexists with the hover glitch:
   *  GSAP queues them on the same target; the hover loop overwrites
   *  whenever it wakes up, then power3.out returns to clean state.       */
  useGSAP(
    () => {
      if (!handsRef.current || !transparentSrc) return;

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 4 + Math.random() * 3,
      });

      tl.to(handsRef.current, {
          duration: 0.05, skewX: 10, x: 8,
          filter: "hue-rotate(80deg) brightness(1.5)", ease: "steps(1)",
        })
        .to(handsRef.current, {
          duration: 0.04, skewX: -6, x: -12,
          filter: "hue-rotate(200deg) brightness(0.6)", ease: "steps(1)",
        })
        .to(handsRef.current, {
          duration: 0.05, skewX: 2, x: 4,
          filter: "hue-rotate(30deg) brightness(1.3)", ease: "steps(1)",
        })
        .to(handsRef.current, {
          duration: 0.18, skewX: 0, x: 0,
          filter: "none", ease: "power3.out",
        });
    },
    { dependencies: [transparentSrc], revertOnUpdate: true },
  );

  /* ── Hover glitch — irregular signal-loss while pointer is over hands ─
   *  A 50ms poll wakes the loop on first hover. Each glitch sequence
   *  re-randomises frame durations, so the eye never picks up a pattern.
   *  Pause between sequences is also randomised (80–220ms).              */
  useGSAP(
    () => {
      if (!handsRef.current) return;
      const el       = handsRef.current;
      let active     = false;
      let nextTimer  = 0;

      const runGlitch = () => {
        if (!isHoveredRef.current) {
          gsap.to(el, {
            duration: 0.15,
            opacity:  1,
            skewX:    0,
            x:        0,
            filter:   "none",
            ease:     "power2.out",
          });
          active = false;
          return;
        }

        active = true;

        const glitchFrames = [
          { opacity: 0.85, skewX:  8, x:   6, filter: "hue-rotate(60deg) brightness(1.6) saturate(2)", dur: 0.04 + Math.random() * 0.03 },
          { opacity: 1,    skewX:  0, x:   0, filter: "none",                                           dur: 0.05 + Math.random() * 0.04 },
          { opacity: 0.7,  skewX: -5, x:  -9, filter: "hue-rotate(190deg) brightness(0.7)",             dur: 0.03 + Math.random() * 0.02 },
          { opacity: 0.9,  skewX:  3, x:   4, filter: "brightness(1.4) saturate(1.5)",                  dur: 0.06 + Math.random() * 0.04 },
          { opacity: 0,    skewX:  0, x: -14, filter: "none",                                           dur: 0.02 },
          { opacity: 1,    skewX:  0, x:   0, filter: "none",                                           dur: 0.08 + Math.random() * 0.06 },
        ];

        const tl = gsap.timeline({
          onComplete: () => {
            const pause = 80 + Math.random() * 140;
            nextTimer  = window.setTimeout(runGlitch, pause);
          },
        });

        glitchFrames.forEach((frame) => {
          tl.to(el, {
            duration: frame.dur,
            opacity:  frame.opacity,
            skewX:    frame.skewX,
            x:        frame.x,
            filter:   frame.filter,
            ease:     "steps(1)",
          });
        });
      };

      const checkHover = () => {
        if (isHoveredRef.current && !active) runGlitch();
      };

      const intervalId = window.setInterval(checkHover, 50);

      return () => {
        window.clearInterval(intervalId);
        window.clearTimeout(nextTimer);
        gsap.killTweensOf(el);
      };
    },
    { dependencies: [] },
  );

  return (
    <section
      aria-label="Hero — SBDESIGN"
      className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden"
    >

      {/* ── z-[1] · Background image (pozadie modre.jpg) ─────────────────
       *  Plain <img> + object-cover beats CSS background-image here:
       *  the browser hands the decode to a separate thread and we get a
       *  real <img> compositor layer (cheap GPU upload, no repaint).      */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/pozadie modre.jpg"
          alt=""
          aria-hidden
          draggable={false}
          className="w-full h-full object-cover object-center"
        />

        {/* ── z-[2] · Dark overlay — readability gradient ──────────────── */}
        <div
          aria-hidden
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* ── Radial vignette (z-5) ─────────────────────────────────────────
       *  Sits BELOW the sandwich so it darkens the page background but
       *  never dims the gradient text or the hands above.                 */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* ── LAYER 1 · z-10 · Gradient FILL text (static) ─────────────────
       *  The "bread" the hands sit on top of. Never animated — keeping
       *  this static lets the browser cache it as a single texture.       */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none text-center">
        <span style={fillTextStyle}>
          DIGITÁLNY<br />MARKETING
        </span>
      </div>

      {/* ── LAYER 2 · z-20 · Hands (transparent PNG, animated) ───────────
       *  Float wrapper is a separate <motion.div> so the continuous y/x
       *  transform never collides with GSAP's glitch transform on the
       *  inner <img>. Two independent transform owners = zero contention.
       *  pointer-events-auto so the hover glitch can be triggered.        */}
      <motion.div
        className="absolute inset-0 z-[20] flex items-center justify-center pointer-events-auto"
        onMouseEnter={() => {
          isHoveredRef.current = true;
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          setIsHovered(false);
        }}
        animate={{ y: [0, -16, 0], x: [0, 3, -2, 0] }}
        transition={{
          y: { duration: 5.5, ease: "easeInOut", repeat: Infinity },
          x: { duration: 8,   ease: "easeInOut", repeat: Infinity },
        }}
        style={{ willChange: "transform" }}
      >
        {transparentSrc && (
          <img
            ref={handsRef}
            src={transparentSrc}
            alt=""
            aria-hidden
            draggable={false}
            style={{
              width:          "100vw",
              maxWidth:       "none",
              height:         "70vh",
              objectFit:      "cover",
              objectPosition: "center center",
              willChange:     "transform, filter",
            }}
          />
        )}
      </motion.div>

      {/* ── z-[25] · Procedural lightning between fingertips (hover-only) */}
      <LightningBolt active={isHovered} />

      {/* ── LAYER 3 · z-30 · Outline text (static) ───────────────────────
       *  Identical metrics to layer 1 so the white hairline traces the
       *  exact gradient silhouette above the hands → sandwich complete.   */}
      <div
        aria-hidden
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none select-none text-center"
      >
        <span style={outlineTextStyle}>
          DIGITÁLNY<br />MARKETING
        </span>
      </div>

      {/* ── UI · z-40 ─────────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-16 z-40 flex flex-col items-center gap-6">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          style={{
            fontFamily:    "Syne, sans-serif",
            letterSpacing: "0.28em",
            fontSize:      "13px",
            color:         "rgba(0, 212, 255, 0.5)",
            textTransform: "uppercase",
          }}
        >
          Webové riešenia na mieru
        </motion.p>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        >
          <ChevronDown size={20} color="#0057FF" strokeWidth={1.5} />
        </motion.div>

      </div>

    </section>
  );
}
