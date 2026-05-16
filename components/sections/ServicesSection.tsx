// FILE: components/sections/ServicesSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/* ════════════════════════════════════════════════════════════════════════════
 *  SVG Mockups
 * ════════════════════════════════════════════════════════════════════════════ */
function WebMockup() {
  return (
    <svg viewBox="0 0 360 155" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "170px", display: "block" }}>
      <rect x="8" y="8" width="344" height="144" rx="6"
        fill="rgba(0,10,30,0.8)" stroke="rgba(0,87,255,0.3)" strokeWidth="1" />
      <rect x="8" y="8" width="344" height="24" rx="6" fill="rgba(0,30,80,0.6)" />
      <rect x="8" y="26" width="344" height="6" fill="rgba(0,30,80,0.6)" />
      <circle cx="22" cy="20" r="4" fill="rgba(255,90,90,0.5)" />
      <circle cx="34" cy="20" r="4" fill="rgba(255,180,50,0.5)" />
      <circle cx="46" cy="20" r="4" fill="rgba(50,200,100,0.5)" />
      <rect x="60" y="13" width="200" height="14" rx="7"
        fill="rgba(0,20,60,0.8)" stroke="rgba(0,87,255,0.2)" strokeWidth="0.5" />
      <text x="68" y="23" fontFamily="monospace" fontSize="7" fill="rgba(0,212,255,0.6)">sbdesign.sk</text>
      <rect x="16" y="40" width="328" height="104" rx="2" fill="rgba(0,5,20,0.9)" />
      <rect x="16" y="40" width="328" height="16" fill="rgba(0,10,40,0.8)" />
      <rect x="24" y="45" width="30" height="6" rx="1" fill="rgba(255,255,255,0.15)" />
      <rect x="260" y="45" width="20" height="6" rx="3" fill="rgba(0,87,255,0.4)" />
      <rect x="285" y="45" width="20" height="6" rx="3" fill="rgba(0,87,255,0.4)" />
      <rect x="310" y="44" width="28" height="8" rx="1"
        fill="rgba(0,87,255,0.3)" stroke="rgba(0,212,255,0.4)" strokeWidth="0.5" />
      <rect x="24" y="65" width="180" height="14" rx="1" fill="rgba(255,255,255,0.7)" />
      <rect x="24" y="84" width="140" height="14" rx="1" fill="rgba(255,255,255,0.5)" />
      <rect x="24" y="104" width="60" height="10" rx="1" fill="rgba(0,87,255,0.6)" />
      <rect x="220" y="60" width="116" height="72" rx="3"
        fill="rgba(0,40,120,0.4)" stroke="rgba(0,87,255,0.2)" strokeWidth="0.5" />
      <rect x="16" y="40" width="328" height="2" rx="1" fill="rgba(0,212,255,0.3)">
        <animateTransform attributeName="transform" type="translate"
          values="0,0;0,104" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite" />
      </rect>
      <radialGradient id="webGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0057FF" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0057FF" stopOpacity="0" />
      </radialGradient>
      <rect x="8" y="8" width="344" height="144" rx="6" fill="url(#webGlow)" />
    </svg>
  );
}

function EshopMockup() {
  return (
    <svg viewBox="0 0 360 155" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "170px", display: "block" }}>
      <rect x="8" y="8" width="344" height="144" rx="6"
        fill="rgba(0,10,30,0.8)" stroke="rgba(0,87,255,0.3)" strokeWidth="1" />
      <rect x="8" y="8" width="344" height="22" rx="6" fill="rgba(0,30,80,0.5)" />
      <rect x="8" y="24" width="344" height="6" fill="rgba(0,30,80,0.5)" />
      <rect x="20" y="13" width="40" height="10" rx="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="330" cy="18" r="5" stroke="rgba(0,212,255,0.5)" strokeWidth="1" />
      <text x="329" y="21" fontFamily="monospace" fontSize="6"
        fill="rgba(0,212,255,0.8)" textAnchor="middle">3</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20 + i * 110} y="40" width="98" height="72" rx="3"
            fill="rgba(0,20,60,0.6)" stroke="rgba(0,87,255,0.15)" strokeWidth="0.5" />
          <rect x={20 + i * 110} y="40" width="98" height="48" rx="3" fill="rgba(0,30,90,0.5)" />
          <rect x={55 + i * 110} y="55" width="28" height="20" rx="2" fill="rgba(0,87,255,0.25)" />
          <rect x={24 + i * 110} y="96" width="60" height="5" rx="1" fill="rgba(255,255,255,0.4)" />
          <rect x={24 + i * 110} y="105" width="35" height="4" rx="1" fill="rgba(0,212,255,0.5)" />
          <rect x={78 + i * 110} y="103" width="32" height="6" rx="1" fill="rgba(0,87,255,0.4)" />
        </g>
      ))}
      <rect x="8" y="124" width="344" height="28" rx="6"
        fill="rgba(0,40,120,0.3)" stroke="rgba(0,87,255,0.2)" strokeWidth="0.5" />
      <rect x="20" y="132" width="80" height="10" rx="1" fill="rgba(255,255,255,0.15)" />
      <rect x="260" y="130" width="84" height="14" rx="2" fill="rgba(0,87,255,0.5)" />
      <radialGradient id="eshopGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0057FF" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#0057FF" stopOpacity="0" />
      </radialGradient>
      <rect x="8" y="8" width="344" height="144" rx="6" fill="url(#eshopGlow)" />
    </svg>
  );
}

function AdsMockup() {
  return (
    <svg viewBox="0 0 360 155" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "170px", display: "block" }}>
      <rect x="8" y="8" width="344" height="144" rx="6"
        fill="rgba(0,10,30,0.8)" stroke="rgba(0,87,255,0.3)" strokeWidth="1" />
      <rect x="8" y="8" width="344" height="22" rx="6" fill="rgba(0,30,80,0.5)" />
      <rect x="8" y="24" width="344" height="6" fill="rgba(0,30,80,0.5)" />
      <rect x="16" y="13" width="60" height="10" rx="2" fill="rgba(0,87,255,0.3)" />
      <text x="46" y="21" fontFamily="monospace" fontSize="6"
        fill="rgba(255,255,255,0.6)" textAnchor="middle">Campaign</text>
      {[
        { label: "Reach", value: "42K",  color: "0,87,255" },
        { label: "CTR",   value: "4.8%", color: "0,150,220" },
        { label: "ROAS",  value: "3.2×", color: "0,212,255" },
      ].map((stat, i) => (
        <g key={i}>
          <rect x={16 + i * 112} y="38" width="100" height="32" rx="3"
            fill={`rgba(${stat.color},0.1)`} stroke={`rgba(${stat.color},0.3)`} strokeWidth="0.5" />
          <text x={66 + i * 112} y="52" fontFamily="Syne, sans-serif"
            fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
            {stat.value}
          </text>
          <text x={66 + i * 112} y="62" fontFamily="monospace"
            fontSize="6" fill={`rgba(${stat.color},0.7)`} textAnchor="middle" letterSpacing="1">
            {stat.label}
          </text>
        </g>
      ))}
      <rect x="16" y="80" width="220" height="64" rx="3"
        fill="rgba(0,10,40,0.6)" stroke="rgba(0,87,255,0.15)" strokeWidth="0.5" />
      {[30, 45, 38, 55, 42, 68, 52, 75, 60, 80, 65, 85].map((h, i) => (
        <rect key={i} x={22 + i * 17} y={144 - h * 0.55} width="10" height={h * 0.55} rx="1"
          fill={i > 8 ? "rgba(0,87,255,0.7)" : "rgba(0,87,255,0.25)"} />
      ))}
      <polyline
        points="22,128 39,118 56,122 73,112 90,116 107,104 124,108 141,98 158,102 175,92 192,96 209,88"
        stroke="rgba(0,212,255,0.6)" strokeWidth="1.5" fill="none" />
      <rect x="244" y="80" width="104" height="28" rx="3"
        fill="rgba(0,60,180,0.2)" stroke="rgba(0,87,255,0.3)" strokeWidth="0.5" />
      <text x="296" y="98" fontFamily="monospace" fontSize="8"
        fill="rgba(255,255,255,0.5)" textAnchor="middle">META ADS</text>
      <rect x="244" y="116" width="104" height="28" rx="3"
        fill="rgba(0,40,120,0.2)" stroke="rgba(0,87,255,0.2)" strokeWidth="0.5" />
      <text x="296" y="134" fontFamily="monospace" fontSize="8"
        fill="rgba(255,255,255,0.4)" textAnchor="middle">GOOGLE ADS</text>
      <rect x="175" y="107" width="10" height="37" rx="1" fill="rgba(0,212,255,0.4)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  Services data
 * ════════════════════════════════════════════════════════════════════════════ */
interface ServiceItem {
  num:         string;
  title:       string;
  description: string;
  features:    string[];
  mockup:      React.ReactNode;
  delay:       number;
}

const services: ServiceItem[] = [
  {
    num:         "01",
    title:       "Webstránky",
    description: "Vlastný kód. Žiadne šablóny. Weby ktoré načítavajú za sekundu a predávajú.",
    features:    ["Next.js / React", "Animácie & interakcie", "PageSpeed 95+"],
    mockup:      <WebMockup />,
    delay:       0,
  },
  {
    num:         "02",
    title:       "E-shopy",
    description: "Kompletný e-shop na mieru — od dizajnu po platobné brány.",
    features:    ["Shopify / WooCommerce", "Platobné brány", "Mobilný dizajn"],
    mockup:      <EshopMockup />,
    delay:       0.15,
  },
  {
    num:         "03",
    title:       "Meta & Google Ads",
    description: "Kampane ktoré prinášajú reálnych zákazníkov. Nie len kliky.",
    features:    ["Meta Ads (FB + IG)", "Google Search & Display", "A/B testovanie"],
    mockup:      <AdsMockup />,
    delay:       0.1,
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  ServiceCard
 * ════════════════════════════════════════════════════════════════════════════ */
function ServiceCard({ service, side }: { service: ServiceItem; side: "left" | "right" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      transition={{ duration: 0.9, delay: service.delay, ease: EASE }}
      viewport={{ once: true, margin: "-60px" }}
      style={{
        border:               `1px solid ${hovered ? "rgba(0,87,255,0.5)" : "rgba(255,255,255,0.07)"}`,
        background:           hovered ? "rgba(0,20,60,0.75)" : "rgba(0,8,24,0.6)",
        backdropFilter:       "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        overflow:             "hidden",
        transition:           "background 0.4s ease, border-color 0.4s ease",
        position:             "relative",
        cursor:               "default",
        width:                "100%",
      }}
    >
      {/* Mockup */}
      <div style={{ overflow: "hidden", borderBottom: "1px solid rgba(0,87,255,0.1)", margin: 0, padding: "10px", width: "100%", height: "190px", display: "block", flexShrink: 0, boxSizing: "border-box" }}>
        {service.mockup}
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(20px,2.5vw,32px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.2em", color: hovered ? "rgba(0,212,255,0.8)" : "rgba(0,87,255,0.5)", transition: "color 0.3s" }}>
            {service.num}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#0057FF", boxShadow: hovered ? "0 0 8px #0057FF" : "none", transition: "box-shadow 0.3s" }} />
            <span style={{ fontFamily: "monospace", fontSize: "8px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>AKTÍVNE</span>
          </div>
        </div>

        <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "clamp(22px,2.5vw,36px)", color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "10px" }}>
          {service.title}
        </h3>

        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 400, fontSize: "clamp(12px,1vw,14px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "16px" }}>
          {service.description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "16px" }}>
          {service.features.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#0057FF", flexShrink: 0 }} />
              <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.35)", transition: "color 0.2s" }}>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.05em" }}>Zistiť viac</span>
          <span style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.2s" }}>→</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(to right, transparent, #0057FF, transparent)",
        transform: `scaleX(${hovered ? 1 : 0})`,
        transition: "transform 0.4s ease",
        transformOrigin: "center",
        pointerEvents: "none",
      }} />
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  StatBlock (preserved component — currently unused in new layout)
 * ════════════════════════════════════════════════════════════════════════════ */
function StatBlock() {
  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
      viewport={{ once: true, margin: "-60px" }}
      style={{ padding: "24px", border: "1px solid rgba(0,87,255,0.2)", background: "rgba(0,87,255,0.04)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
    >
      <p style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(0,212,255,0.5)", textTransform: "uppercase", marginBottom: "12px" }}>
        ● Priemerný výsledok
      </p>
      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,48px)", color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "4px" }}>
        3× viac
      </p>
      <p style={{ fontFamily: "Syne, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
        konverzií oproti predošlému webu
      </p>
    </motion.div>
  );
}
// Keep referenced to avoid unused-symbol churn while preserving the component.
void StatBlock;

/* ════════════════════════════════════════════════════════════════════════════
 *  ConnectorLines — updated for new top-row + bottom-center layout
 * ════════════════════════════════════════════════════════════════════════════ */
function ConnectorLines() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const lines = svgRef.current?.querySelectorAll<SVGPathElement>(".connector-line");
    if (!lines || lines.length === 0) return;

    lines.forEach((line, i) => {
      const length = line.getTotalLength ? line.getTotalLength() : 200;
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(line, {
        strokeDashoffset: 0, duration: 1.5, ease: "power2.out", delay: i * 0.15,
        scrollTrigger: { trigger: svgRef.current, start: "top 70%", once: true },
      });
    });

    gsap.to(Array.from(lines), {
      opacity: 0.3, duration: 2, ease: "power1.inOut", repeat: -1, yoyo: true, stagger: 0.4, delay: 2,
    });
  }, { dependencies: [] });

  return (
    <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
      {/* Top-left card → orb */}
      <path className="connector-line" d="M 32 28 Q 41 28 48 28" stroke="rgba(0,87,255,0.5)"  strokeWidth="0.25" fill="none" />
      {/* Top-right card → orb */}
      <path className="connector-line" d="M 68 28 Q 59 28 52 28" stroke="rgba(0,212,255,0.4)" strokeWidth="0.25" fill="none" />
      {/* Bottom-center card → orb */}
      <path className="connector-line" d="M 50 62 Q 50 48 50 36" stroke="rgba(0,150,255,0.45)" strokeWidth="0.25" fill="none" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  OrbComponent — Canvas-based plasma energy sphere
 *  Deep blue glowing planet with atmosphere, internal swirls, particles
 * ════════════════════════════════════════════════════════════════════════════ */
function OrbComponent({ isMobile }: { isMobile: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<number>(isMobile ? 240 : 420);

  // Compute responsive size for canvas
  useEffect(() => {
    const compute = () => {
      if (window.innerWidth < 768) return 240;
      const target = Math.min(Math.max(window.innerWidth * 0.26, 260), 420);
      return Math.round(target);
    };
    setSize(compute());
    const onResize = () => setSize(compute());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [isMobile]);

  // Render plasma orb on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = size;
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const R = SIZE * 0.38;

    let t = 0;
    let rafId = 0;

    // Particle system — orbital, breathing across sphere
    const PARTICLES = 280;
    const particles = Array.from({ length: PARTICLES }, () => {
      const angle      = Math.random() * Math.PI * 2;
      const radius     = R * (0.85 + Math.random() * 0.45);
      const speed      = 0.003 + Math.random() * 0.006;
      const sz         = 0.8 + Math.random() * 1.8;
      const brightness = 0.3 + Math.random() * 0.7;
      return {
        angle, radius, speed, size: sz, brightness,
        y:      (Math.random() - 0.5) * R * 1.2,
        ySpeed: (Math.random() - 0.5) * 0.008,
      };
    });

    const draw = () => {
      t += 0.007;
      ctx.clearRect(0, 0, SIZE, SIZE);

      /* ── DEEP SPACE ATMOSPHERE (3 layers) ── */
      [1.9, 1.5, 1.2].forEach((mult, i) => {
        const atmo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * mult);
        const alphas = [0.06, 0.10, 0.14];
        atmo.addColorStop(0,   `rgba(0,60,255,${alphas[i]})`);
        atmo.addColorStop(0.5, `rgba(0,40,180,${alphas[i] * 0.4})`);
        atmo.addColorStop(1,   "rgba(0,10,60,0)");
        ctx.fillStyle = atmo;
        ctx.fillRect(0, 0, SIZE, SIZE);
      });

      /* ── MAIN SPHERE — deep ocean blue core ── */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const body = ctx.createRadialGradient(
        cx - R * 0.28, cy - R * 0.22, R * 0.02,
        cx + R * 0.1,  cy + R * 0.1,  R,
      );
      body.addColorStop(0,    "rgba(180,220,255,1)");
      body.addColorStop(0.08, "rgba(80,160,255,1)");
      body.addColorStop(0.22, "rgba(10,80,220,0.98)");
      body.addColorStop(0.45, "rgba(0,30,140,0.96)");
      body.addColorStop(0.72, "rgba(0,10,70,0.97)");
      body.addColorStop(1,    "rgba(0,3,28,1)");
      ctx.fillStyle = body;
      ctx.fill();
      ctx.restore();

      /* ── PLASMA SWIRLS (clipped to sphere) ── */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Primary swirl band — wraps around equator
      for (let i = 0; i < 6; i++) {
        const a = t * 0.35 + (i / 6) * Math.PI * 2;
        const bx = cx + Math.cos(a) * R * 0.42;
        const by = cy + Math.sin(a * 0.65) * R * 0.28;
        const r  = R * (0.38 + Math.sin(t * 0.4 + i) * 0.08);
        const s  = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        const alpha = 0.14 + Math.sin(t * 0.9 + i * 1.1) * 0.06;
        s.addColorStop(0,   `rgba(30,160,255,${alpha})`);
        s.addColorStop(0.4, `rgba(0,100,220,${alpha * 0.5})`);
        s.addColorStop(1,   "rgba(0,40,150,0)");
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = s;
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      }

      // Secondary counter-swirl — polar regions
      for (let i = 0; i < 4; i++) {
        const a = -t * 0.22 + (i / 4) * Math.PI * 2;
        const bx = cx + Math.cos(a) * R * 0.30;
        const by = cy + Math.sin(a * 1.4) * R * 0.42;
        const r  = R * (0.28 + Math.cos(t * 0.6 + i * 0.8) * 0.06);
        const s  = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        const alpha = 0.10 + Math.cos(t * 1.2 + i * 1.5) * 0.04;
        s.addColorStop(0,   `rgba(80,200,255,${alpha})`);
        s.addColorStop(0.5, `rgba(0,120,255,${alpha * 0.4})`);
        s.addColorStop(1,   "rgba(0,60,200,0)");
        ctx.fillStyle = s;
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      }

      // Thin bright plasma filament (signature bright streak)
      for (let i = 0; i < 3; i++) {
        const a = t * 0.18 + i * ((Math.PI * 2) / 3);
        const x1 = cx + Math.cos(a) * R * 0.1;
        const y1 = cy + Math.sin(a * 0.8) * R * 0.15;
        const x2 = cx + Math.cos(a + 1.2) * R * 0.65;
        const y2 = cy + Math.sin(a * 0.8 + 0.9) * R * 0.50;
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        const fa = 0.18 + Math.sin(t * 1.5 + i * 2) * 0.08;
        grad.addColorStop(0,   `rgba(150,220,255,${fa})`);
        grad.addColorStop(0.5, `rgba(50,150,255,${fa * 0.6})`);
        grad.addColorStop(1,   "rgba(0,80,200,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(
          cx + Math.cos(a + 0.6) * R * 0.35,
          cy + Math.sin(a * 0.9 + 0.4) * R * 0.35,
          x2, y2,
        );
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.restore();

      /* ── FRESNEL LIMB DARKENING + EDGE GLOW ── */
      ctx.save();
      const limb = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R);
      limb.addColorStop(0,    "rgba(0,80,255,0)");
      limb.addColorStop(0.55, "rgba(0,100,255,0.08)");
      limb.addColorStop(0.80, "rgba(0,140,255,0.25)");
      limb.addColorStop(0.93, "rgba(0,180,255,0.45)");
      limb.addColorStop(1,    "rgba(0,220,255,0.60)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = limb;
      ctx.fill();
      ctx.restore();

      /* ── SPECULAR HIGHLIGHT (sharp bright spot) ── */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      const hx = cx - R * 0.29;
      const hy = cy - R * 0.26;
      const spec = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * 0.32);
      const sa = 0.55 + Math.sin(t * 0.5) * 0.08;
      spec.addColorStop(0,    `rgba(255,255,255,${sa})`);
      spec.addColorStop(0.18, `rgba(200,235,255,${sa * 0.65})`);
      spec.addColorStop(0.45, `rgba(100,180,255,${sa * 0.2})`);
      spec.addColorStop(1,    "rgba(0,100,200,0)");
      ctx.fillStyle = spec;
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();

      // Secondary soft highlight (right side subtle)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      const h2x = cx + R * 0.38;
      const h2y = cy + R * 0.20;
      const spec2 = ctx.createRadialGradient(h2x, h2y, 0, h2x, h2y, R * 0.25);
      spec2.addColorStop(0, "rgba(0,180,255,0.12)");
      spec2.addColorStop(1, "rgba(0,100,255,0)");
      ctx.fillStyle = spec2;
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();

      /* ── OUTER MULTI-LAYER GLOW ── */
      [{ r: 1.08, a: 0.22 }, { r: 1.18, a: 0.10 }, { r: 1.32, a: 0.04 }].forEach(({ r, a }) => {
        const pulse = a + Math.sin(t * 0.9) * (a * 0.2);
        const g = ctx.createRadialGradient(cx, cy, R * (r - 0.06), cx, cy, R * r);
        g.addColorStop(0, `rgba(0,120,255,${pulse})`);
        g.addColorStop(1, "rgba(0,60,200,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, R * r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ── PARTICLES ── */
      particles.forEach((p) => {
        p.angle += p.speed;
        p.y     += p.ySpeed;
        if (Math.abs(p.y) > R * 0.7) p.ySpeed *= -1;

        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + p.y;
        const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
        const fade =
          dist > R
            ? Math.max(0, 1 - (dist - R) / (R * 0.35))
            : 0.85;
        const alpha = p.brightness * fade * (0.5 + Math.sin(t * 3 + p.angle * 2) * 0.3);

        if (alpha > 0.02) {
          // Larger particles get a soft glow halo
          if (p.size > 1.8) {
            const pg = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
            pg.addColorStop(0, `rgba(150,220,255,${alpha * 0.5})`);
            pg.addColorStop(1, "rgba(0,150,255,0)");
            ctx.fillStyle = pg;
            ctx.beginPath();
            ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,230,255,${Math.min(alpha, 0.9)})`;
          ctx.fill();
        }
      });

      /* ── FINAL PULSE RINGS ── */
      const ringA = 0.35 + Math.sin(t * 1.8) * 0.15;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.005, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,180,255,${ringA})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const ring2A = 0.12 + Math.sin(t * 1.2 + 1) * 0.06;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.04, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,140,255,${ring2A})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [size]);

  return (
    <div style={{
      position:       "relative",
      width:          size + "px",
      height:         size + "px",
      flexShrink:     0,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      margin:         isMobile ? "32px auto" : undefined,
    }}>
      {/* CSS glow layer behind canvas */}
      <div style={{
        position:      "absolute",
        width:         "130%",
        height:        "130%",
        borderRadius:  "50%",
        background:    "radial-gradient(circle, rgba(0,80,255,0.2) 0%, rgba(0,50,200,0.08) 50%, transparent 70%)",
        filter:        "blur(24px)",
        animation:     "orbOuterGlow 4s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <canvas ref={canvasRef} style={{ position: "relative", zIndex: 1 }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ServicesSection
 * ════════════════════════════════════════════════════════════════════════════ */
export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      aria-label="Naše služby — SB Design"
      style={{
        position:       "relative",
        marginTop:      "80px",
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
        padding:        "80px clamp(20px,5vw,80px) 80px",
      }}
    >
      {/* Section title — static flow, first child */}
      <div style={{
        textAlign:    "center",
        marginBottom: "48px",
        position:     "relative",
        zIndex:       2,
      }}>
        <p style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "8px" }}>
          Naše služby
        </p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,56px)", color: "#FFFFFF", letterSpacing: "-0.025em", lineHeight: 0.9, marginBottom: 0 }}>
          Čo pre vás dokážeme.
        </h2>
      </div>

      {/* Wrapper — column flex: top grid row + bottom centered card */}
      <div style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            "clamp(24px,3vw,48px)",
        width:          "100%",
        maxWidth:       "1400px",
        position:       "relative",
        zIndex:         1,
      }}>
        {!isMobile && <ConnectorLines />}

        {isMobile ? (
          /* MOBILE — stack everything vertically */
          <div style={{
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            gap:           "24px",
            width:         "100%",
          }}>
            <ServiceCard service={services[0]} side="left" />
            <OrbComponent isMobile={isMobile} />
            <ServiceCard service={services[2]} side="right" />
            <ServiceCard service={services[1]} side="left" />
          </div>
        ) : (
          <>
            {/* TOP ROW — Card1 + Orb + Card2 */}
            <div style={{
              display:             "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap:                 "clamp(20px,3vw,48px)",
              width:               "100%",
              alignItems:          "center",
            }}>
              <ServiceCard service={services[0]} side="left" />
              <OrbComponent isMobile={isMobile} />
              <ServiceCard service={services[2]} side="right" />
            </div>

            {/* BOTTOM — Card3 (E-shopy) centered */}
            <div style={{
              width:    "100%",
              maxWidth: "420px",
            }}>
              <ServiceCard service={services[1]} side="left" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
