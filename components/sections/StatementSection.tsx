// FILE: components/sections/StatementSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────────────────
 *  Shared easing — locked tuples so framer's strict typing accepts without cast.
 * ──────────────────────────────────────────────────────────────────────────── */
const EASE        = [0.16, 1, 0.3, 1] as const;
const POWER2_OUT  = [0.33, 1, 0.68, 1] as const;

/* ════════════════════════════════════════════════════════════════════════════
 *  useAtmosphericCanvas — canvas sized to its parent element.
 *  ResizeObserver keeps it in sync if the section reflows.
 * ════════════════════════════════════════════════════════════════════════════ */
function useAtmosphericCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t   = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width  = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    window.addEventListener("resize", resize);

    const orbs = [
      { baseX: 0.28, baseY: 0.45, r: 0.58, color: "5, 60, 200",  speedX: 0.0007, speedY: 0.0006, orbitX: 0.22, orbitY: 0.14, phase: 0   },
      { baseX: 0.78, baseY: 0.32, r: 0.42, color: "0, 87, 255",  speedX: 0.0010, speedY: 0.0008, orbitX: 0.20, orbitY: 0.18, phase: 2.1 },
      { baseX: 0.50, baseY: 0.78, r: 0.55, color: "10, 30, 120", speedX: 0.0006, speedY: 0.0005, orbitX: 0.25, orbitY: 0.12, phase: 4.3 },
    ];

    const draw = () => {
      t++;
      const w = canvas.width;
      const h = canvas.height;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#010810";
      ctx.fillRect(0, 0, w, h);

      orbs.forEach((orb) => {
        const cx     = (orb.baseX + Math.sin(t * orb.speedX + orb.phase) * orb.orbitX) * w;
        const cy     = (orb.baseY + Math.cos(t * orb.speedY + orb.phase) * orb.orbitY) * h;
        const radius = orb.r * Math.max(w, h);
        const grad   = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0,    `rgba(${orb.color}, 0.30)`);
        grad.addColorStop(0.35, `rgba(${orb.color}, 0.12)`);
        grad.addColorStop(0.7,  `rgba(${orb.color}, 0.03)`);
        grad.addColorStop(1,    `rgba(${orb.color}, 0)`);
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      ctx.globalCompositeOperation = "source-over";
      const vignette = ctx.createRadialGradient(
        w * 0.5, h * 0.5, h * 0.10,
        w * 0.5, h * 0.5, h * 0.90,
      );
      vignette.addColorStop(0,   "rgba(1,8,16,0)");
      vignette.addColorStop(0.5, "rgba(1,8,16,0.2)");
      vignette.addColorStop(1,   "rgba(1,8,16,0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  Stat — gradient-text label pair.
 * ════════════════════════════════════════════════════════════════════════════ */
function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          fontFamily:           "Syne, sans-serif",
          fontWeight:           900,
          fontSize:             "clamp(48px, 6vw, 88px)",
          lineHeight:           1,
          letterSpacing:        "-0.02em",
          fontVariantNumeric:   "tabular-nums",
          background:           "linear-gradient(135deg, #FFFFFF 0%, #4A8FFF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:  "transparent",
          backgroundClip:       "text",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize:      "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.3)",
          marginTop:     "4px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  AnimatedCounter — IntersectionObserver-driven easeOut count-up.
 * ════════════════════════════════════════════════════════════════════════════ */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  StatementSection — two stacked parts inside ONE shared canvas section.
 * ════════════════════════════════════════════════════════════════════════════ */
export default function StatementSection() {
  /* ── Viewport switching */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Part A refs */
  const sectionARef   = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const watermarkRef  = useRef<HTMLSpanElement>(null);
  const diagLineRef   = useRef<HTMLDivElement>(null);
  const dotGridRef    = useRef<HTMLDivElement>(null);
  const statementRef  = useRef<HTMLDivElement>(null);
  const line1Ref      = useRef<HTMLSpanElement>(null);
  const line2Ref      = useRef<HTMLSpanElement>(null);
  const line3Ref      = useRef<HTMLSpanElement>(null);
  useAtmosphericCanvas(canvasRef);

  /* ── Part B refs */
  const sectionBRef    = useRef<HTMLElement>(null);
  const founderNameRef = useRef<HTMLSpanElement>(null);
  const photoOuterRef  = useRef<HTMLDivElement>(null);
  const photoRef       = useRef<HTMLImageElement>(null);

  /* ── GSAP — parallax + clip-reveal */
  useGSAP(
    () => {
      if (diagLineRef.current) {
        gsap.fromTo(
          diagLineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: diagLineRef.current, start: "top 80%", once: true },
          },
        );
      }

      if (watermarkRef.current && sectionARef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: 0 },
          {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: sectionARef.current,
              start:   "top bottom",
              end:     "bottom top",
              scrub:   1,
            },
          },
        );
      }

      if (dotGridRef.current && sectionARef.current) {
        gsap.fromTo(
          dotGridRef.current,
          { y: 0 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: sectionARef.current,
              start:   "top bottom",
              end:     "bottom top",
              scrub:   1,
            },
          },
        );
      }

      const lines = [line1Ref.current, line2Ref.current, line3Ref.current]
        .filter((el): el is HTMLSpanElement => el !== null);

      if (lines.length && statementRef.current) {
        gsap.from(lines, {
          y:        "110%",
          duration: 1,
          ease:     "power4.out",
          stagger:  0.12,
          scrollTrigger: {
            trigger: statementRef.current,
            start:   "top 75%",
            once:    true,
          },
        });
      }

      if (founderNameRef.current) {
        gsap.from(founderNameRef.current, {
          y:        "100%",
          duration: 1,
          ease:     "power4.out",
          scrollTrigger: {
            trigger: founderNameRef.current,
            start:   "top 85%",
            once:    true,
          },
        });
      }

      if (photoRef.current && photoOuterRef.current) {
        gsap.fromTo(
          photoRef.current,
          { y: -30 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: photoOuterRef.current,
              start:   "top bottom",
              end:     "bottom top",
              scrub:   1,
            },
          },
        );
      }
    },
    { dependencies: [] },
  );

  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) return;
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <section
      aria-label="Statement — SB Design"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* atmospheric overlay — two orbs, page base shows through */}
      <div
        aria-hidden
        style={{
          position:      "absolute",
          inset:         0,
          background:    `
            radial-gradient(ellipse 100% 50% at 20% 30%, rgba(0,60,200,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 80% 70%, rgba(0,40,140,0.18) 0%, transparent 60%)
          `,
          zIndex:        0,
          pointerEvents: "none",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
       *  PART A · STATEMENT
       * ════════════════════════════════════════════════════════════════════ */}
      <div
        ref={sectionARef}
        style={{
          position:  "relative",
          minHeight: isMobile ? "auto" : "100vh",
        }}
      >
        {/* z-1 · floating SB watermark (parallax target) */}
        <span
          ref={watermarkRef}
          aria-hidden
          style={{
            position:      "absolute",
            top:           "10%",
            right:         "-2%",
            fontFamily:    "Syne, sans-serif",
            fontWeight:    900,
            fontSize:      "clamp(200px, 25vw, 400px)",
            lineHeight:    1,
            letterSpacing: "-0.05em",
            color:         "rgba(0,87,255,0.04)",
            userSelect:    "none",
            pointerEvents: "none",
            willChange:    "transform",
            zIndex:        1,
          }}
        >
          SB
        </span>

        {/* z-1 · top-left vertical accent line */}
        <div
          ref={diagLineRef}
          aria-hidden
          style={{
            position: "absolute",
            top:      0,
            left:     "8%",
            width:    "1px",
            height:   "40%",
            background: "linear-gradient(to bottom, transparent, rgba(0,87,255,0.3), transparent)",
            pointerEvents: "none",
            zIndex:   1,
            willChange: "transform",
          }}
        />

        {/* z-1 · bottom-right 3×3 dot grid (parallax target) */}
        <div
          ref={dotGridRef}
          aria-hidden
          style={{
            position:            "absolute",
            bottom:              "15%",
            right:               "8%",
            display:             "grid",
            gridTemplateColumns: "repeat(3, 3px)",
            gap:                 "16px",
            pointerEvents:       "none",
            willChange:          "transform",
            zIndex:              1,
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              style={{
                display:      "block",
                width:        "3px",
                height:       "3px",
                borderRadius: "50%",
                background:   "rgba(0,87,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* z-2 · top-right year rule */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            position:      "absolute",
            top:           "48px",
            right:         "clamp(24px, 6vw, 96px)",
            display:       "flex",
            alignItems:    "center",
            gap:           "16px",
            pointerEvents: "none",
            zIndex:        2,
          }}
        >
          <div aria-hidden style={{
            width:      "60px",
            height:     "1px",
            background: "rgba(255,255,255,0.1)",
          }} />
          <span style={{
            fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize:      "9px",
            letterSpacing: "0.25em",
            color:         "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}>
            EST. 2024
          </span>
        </motion.div>

        {/* z-10 · content */}
        <div
          style={{
            position: "relative",
            zIndex:   10,
            paddingTop:    "clamp(120px, 15vh, 200px)",
            paddingLeft:   "clamp(24px, 6vw, 96px)",
            paddingRight:  "clamp(24px, 6vw, 96px)",
            paddingBottom: isMobile ? "40px" : "clamp(80px, 10vh, 120px)",
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{
              fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize:      "9px",
              letterSpacing: "0.3em",
              color:         "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              margin:        "0 0 56px 0",
            }}
          >
            SB DESIGN · NITRA · 2026
          </motion.p>

          {/* Statement — 3 staggered clip-reveal lines */}
          <div ref={statementRef}>
            {/* Line 1 */}
            <div style={{ overflow: "hidden", paddingBottom: "0.04em" }}>
              <span
                ref={line1Ref}
                style={{
                  display:       "inline-block",
                  fontFamily:    "Syne, sans-serif",
                  fontWeight:    900,
                  fontSize:      "clamp(56px, 9vw, 150px)",
                  lineHeight:    0.88,
                  letterSpacing: "-0.035em",
                  color:         "#FFFFFF",
                  willChange:    "transform",
                }}
              >
                Weby ktoré
              </span>
            </div>

            {/* Line 2 — period in brand gradient */}
            <div style={{ overflow: "hidden", paddingBottom: "0.04em" }}>
              <span
                ref={line2Ref}
                style={{
                  display:       "inline-block",
                  fontFamily:    "Syne, sans-serif",
                  fontWeight:    900,
                  fontSize:      "clamp(56px, 9vw, 150px)",
                  lineHeight:    0.88,
                  letterSpacing: "-0.035em",
                  color:         "#FFFFFF",
                  willChange:    "transform",
                }}
              >
                predávajú
                <span style={{
                  background:           "linear-gradient(135deg, #0057FF, #4A8FFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor:  "transparent",
                  backgroundClip:       "text",
                }}>
                  .
                </span>
              </span>
            </div>

            {/* Line 3 — smaller, lighter weight */}
            <div style={{ overflow: "hidden", marginTop: "24px" }}>
              <span
                ref={line3Ref}
                style={{
                  display:       "inline-block",
                  fontFamily:    "Syne, sans-serif",
                  fontWeight:    400,
                  fontSize:      "clamp(24px, 3.5vw, 56px)",
                  letterSpacing: "-0.02em",
                  color:         "rgba(255,255,255,0.4)",
                  lineHeight:    1.05,
                  willChange:    "transform",
                }}
              >
                Nie len vyzerajú.
              </span>
            </div>
          </div>

          {/* Two-column row: paragraph (with brand-blue rule) + stats */}
          <div
            style={{
              display:        "flex",
              flexDirection:  isMobile ? "column" : "row",
              alignItems:     isMobile ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              gap:            isMobile ? "48px" : "clamp(48px, 8vw, 120px)",
              marginTop:      "clamp(48px, 6vh, 80px)",
            }}
          >
            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              style={{
                fontFamily:  "Syne, sans-serif",
                fontWeight:  400,
                fontSize:    "clamp(15px, 1.1vw, 17px)",
                lineHeight:  1.85,
                color:       "rgba(255,255,255,0.45)",
                maxWidth:    "380px",
                margin:      0,
                paddingLeft: "20px",
                borderLeft:  "2px solid rgba(0,87,255,0.4)",
              }}
            >
              Nezaujíma nás vytvárať pekné weby. Zaujíma nás vytvárať weby, ktoré prinášajú reálne výsledky.
            </motion.p>

            {/* Stats */}
            <div
              style={{
                display:      "flex",
                gap:          "clamp(32px, 5vw, 48px)",
                flexShrink:   0,
                marginBottom: isMobile ? "0px" : undefined,
                paddingBottom: isMobile ? "0px" : undefined,
              }}
            >
              <Stat value={<AnimatedCounter target={47} suffix="+" />} label="Projektov" />
              <Stat value={<AnimatedCounter target={100} suffix="%" />} label="Spokojných klientov" />
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
       *  PART B · FOUNDER SPLIT
       * ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={sectionBRef}
        aria-label="Founder — Samuel Biben"
        style={{
          position:      "relative",
          background:    "transparent",
          borderTop:     "1px solid rgba(0,87,255,0.12)",
          display:       "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight:     isMobile ? "auto" : "80vh",
          overflow:      "hidden",
        }}
      >
        {/* z-0 · atmospheric canvas — Part B only */}
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: "absolute",
            inset:    0,
            width:    "100%",
            height:   "100%",
            zIndex:   0,
          }}
        />

        {/* top blend — softens seam between Part A and Part B */}
        <div
          aria-hidden
          style={{
            position:      "absolute",
            top:           0,
            left:          0,
            right:         0,
            height:        "120px",
            background:    "linear-gradient(to bottom, rgba(0,20,80,0.3), transparent)",
            pointerEvents: "none",
            zIndex:        0,
          }}
        />

        {/* Breathing brand-blue top accent */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position:      "absolute",
            top:           0,
            left:          0,
            right:         0,
            height:        "1px",
            background:    "linear-gradient(90deg, transparent, #0057FF 50%, transparent)",
            pointerEvents: "none",
            zIndex:        2,
          }}
        />

        {/* LEFT — text column */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            order:          isMobile ? 1 : 0,
            width:          isMobile ? "100%" : "55%",
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            padding:        isMobile ? "40px 24px 60px" : "clamp(64px, 10vh, 120px) clamp(24px, 6vw, 96px)",
            position:       "relative",
            zIndex:         1,
          }}
        >
          {/* Eyebrow with leading line */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div aria-hidden style={{
              width:      "20px",
              height:     "1px",
              background: "#0057FF",
            }} />
            <span style={{
              fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize:      "9px",
              letterSpacing: "0.25em",
              color:         "#0057FF",
              textTransform: "uppercase",
            }}>
              ZAKLADATEĽ
            </span>
          </div>

          {/* Name — clip reveal */}
          <h3 style={{
            fontFamily:    "Syne, sans-serif",
            fontWeight:    900,
            fontSize:      "clamp(48px, 7vw, 112px)",
            lineHeight:    0.85,
            letterSpacing: "-0.04em",
            color:         "#FFFFFF",
            margin:        "0 0 32px 0",
          }}>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.05em" }}>
              <span
                ref={founderNameRef}
                style={{ display: "inline-block", willChange: "transform" }}
              >
                Samuel Biben
              </span>
            </span>
          </h3>

          {/* Description */}
          <p style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 400,
            fontSize:   "16px",
            lineHeight: 1.8,
            color:      "rgba(255,255,255,0.45)",
            maxWidth:   "360px",
            margin:     "0 0 40px 0",
          }}>
            Dizajnér a vývojár s posadnutosťou pre detail. Každý projekt beriem ako vlastný biznis — nie ako úlohu.
          </p>

          {/* Brand-blue divider */}
          <div
            aria-hidden
            style={{
              width:        "40px",
              height:       "1px",
              background:   "linear-gradient(to right, #0057FF, transparent)",
              marginBottom: "32px",
            }}
          />

          {/* Contact block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <motion.div
                aria-hidden
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width:        "5px",
                  height:       "5px",
                  borderRadius: "50%",
                  background:   "#0057FF",
                  flexShrink:   0,
                }}
              />
              <span style={{
                fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize:      "9px",
                letterSpacing: "0.2em",
                color:         "rgba(0,87,255,0.8)",
                textTransform: "uppercase",
              }}>
                Dostupný pre projekty
              </span>
            </div>
            <a
              href="mailto:biben@sbdesign.sk"
              style={{
                fontFamily:     "Syne, sans-serif",
                fontWeight:     400,
                fontSize:       "14px",
                color:          "rgba(255,255,255,0.35)",
                textDecoration: "none",
                transition:     "color 0.2s ease",
                width:          "fit-content",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >
              biben@sbdesign.sk
            </a>
          </div>
        </motion.div>

        {/* RIGHT — cinematic photo column */}
        <div
          ref={photoOuterRef}
          style={{
            order:      isMobile ? 0 : 1,
            width:      isMobile ? "100%" : "45%",
            flexShrink: 0,
            position:   "relative",
            overflow:   "hidden",
            height:     isMobile ? "75vw" : "100%",
            minHeight:  isMobile ? "auto" : "80vh",
            background: "transparent",
          }}
        >
          {/* Outer entrance wrapper (scale + opacity) — keeps the inner img
              free for GSAP-driven parallax `y` without transform conflicts. */}
          <motion.div
            initial={{ scale: 1.06, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              scale:   { duration: 1.6, ease: POWER2_OUT },
              opacity: { duration: 0.8, ease: POWER2_OUT },
            }}
            style={{
              position:   "absolute",
              inset:      0,
              willChange: "transform, opacity",
            }}
          >
            <img
              ref={photoRef}
              src="/Fotka-nova-2.png"
              alt="Samuel Biben — zakladateľ SB Design"
              draggable={false}
              loading="eager"
              style={{
                width:          "100%",
                height:         "100%",
                objectFit:      "cover",
                objectPosition: isMobile ? "top center" : "center top",
                maxHeight:      isMobile ? "85vw" : "none",
                display:        "block",
                willChange:     "transform",
              }}
            />
          </motion.div>

          {/* Left fade — text column bleeds into the image edge */}
          <div
            aria-hidden
            style={{
              position:      "absolute",
              inset:         0,
              background:    "linear-gradient(to right, #010810 0%, rgba(1,8,16,0.5) 30%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Bottom fade — anchors the corner tag */}
          <div
            aria-hidden
            style={{
              position:      "absolute",
              inset:         0,
              background:    "linear-gradient(to top, #010810 0%, rgba(1,8,16,0.7) 20%, transparent 50%)",
              pointerEvents: "none",
            }}
          />

          {/* Brand blue color grade — multiply over the image */}
          <div
            aria-hidden
            style={{
              position:      "absolute",
              inset:         0,
              background:    "rgba(0,20,80,0.25)",
              mixBlendMode:  "multiply",
              pointerEvents: "none",
            }}
          />

          {/* Role tag */}
          <div style={{
            position:             "absolute",
            bottom:               24,
            left:                 24,
            display:              "flex",
            flexDirection:        "column",
            gap:                  "3px",
            padding:              "10px 14px",
            background:           "rgba(0,10,30,0.7)",
            backdropFilter:       "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border:               "1px solid rgba(0,87,255,0.2)",
          }}>
            <span style={{
              fontFamily:    "monospace",
              fontSize:      "8px",
              letterSpacing: "0.25em",
              color:         "rgba(0,87,255,0.8)",
              textTransform: "uppercase",
            }}>
              ● Dostupný
            </span>
            <span style={{
              fontFamily:    "monospace",
              fontSize:      "8px",
              letterSpacing: "0.12em",
              color:         "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}>
              Web Designer & Developer
            </span>
          </div>
        </div>
      </section>
    </section>
  );
}
