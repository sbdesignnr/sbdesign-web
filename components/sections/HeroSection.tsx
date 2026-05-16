// FILE: components/sections/HeroSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/* ════════════════════════════════════════════════════════════════════════════
 *  Shared easing — the TitanGate "premium" curve (snappy out, smooth land).
 *  Locked as const so framer's strict tuple typing accepts it without cast.
 * ════════════════════════════════════════════════════════════════════════════ */
const EASE = [0.16, 1, 0.3, 1] as const;

/* ════════════════════════════════════════════════════════════════════════════
 *  Navigation — fixed top, transparent → blurred on scroll > 60px.
 *  Logo uses the ⬡ hex glyph; per spec, no rounded corners on CTA.
 * ════════════════════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Služby",    href: "#sluzby"    },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Proces",    href: "#proces"    },
  { label: "Kontakt",   href: "#kontakt"   },
] as const;

function Navigation({
  isMobile,
  menuOpen,
  onMenuToggle,
}: {
  isMobile:     boolean;
  menuOpen:     boolean;
  onMenuToggle: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      aria-label="Hlavná navigácia"
      style={{
        position:             "fixed",
        top:                  0,
        left:                 0,
        right:                0,
        zIndex:               50,
        display:              "flex",
        alignItems:           "center",
        justifyContent:       "space-between",
        padding:              "0 clamp(16px, 4vw, 48px)",
        height:               "64px",
        background:           scrolled ? "rgba(2,6,18,0.82)"                : "transparent",
        backdropFilter:       scrolled ? "blur(18px) saturate(160%)"         : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(160%)"         : "none",
        borderBottom:         scrolled ? "1px solid rgba(255,255,255,0.055)" : "1px solid transparent",
        transition:           "background 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s",
      }}
    >
      {/* LEFT — logo */}
      <a
        href="/"
        aria-label="SB DESIGN — domov"
        style={{ flexShrink: 0, zIndex: 2, display: "inline-flex", alignItems: "center" }}
      >
        <img
          src="/SB-Design-Logo-1-5.png"
          alt="SB Design"
          style={{ height: "32px", width: "auto", objectFit: "contain" }}
          draggable={false}
        />
      </a>

      {/* CENTER — primary links, hidden on mobile */}
      <ul
        className="hidden md:flex items-center gap-10"
        style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="transition-colors duration-200"
              style={{
                fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize:      "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.4)",
                whiteSpace:    "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* RIGHT — CTA on desktop, Hamburger on mobile */}
      <div style={{ flexShrink: 0, zIndex: 2 }}>
        {isMobile ? (
          <Hamburger open={menuOpen} onToggle={onMenuToggle} />
        ) : (
          <motion.a
            href="#kontakt"
            onMouseEnter={() => { setCtaHovered(true); }}
            onMouseLeave={() => { setCtaHovered(false); }}
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            "10px",
              border:         ctaHovered ? "1px solid rgba(0,212,255,0.55)" : "1px solid rgba(0,212,255,0.2)",
              padding:        "10px 16px",
              background:     ctaHovered ? "rgba(0,212,255,0.07)" : "rgba(0,212,255,0.03)",
              borderRadius:   0,
              position:       "relative",
              overflow:       "hidden",
              transition:     "border-color 0.25s ease, background 0.25s ease",
            }}
          >
            {/* Sweep line */}
            <motion.div
              aria-hidden
              style={{
                position:   "absolute",
                top:        0,
                height:     "1px",
                width:      "100%",
                background: "linear-gradient(to right, transparent, #00D4FF, transparent)",
              }}
              initial={{ left: "-100%" }}
              animate={{ left: ctaHovered ? "100%" : "-100%" }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
            {/* Label */}
            <span style={{
              fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize:      "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "rgba(255,255,255,0.7)",
              whiteSpace:    "nowrap",
            }}>
              KONZULTÁCIA
            </span>
            {/* Diagonal arrow */}
            <motion.span
              aria-hidden
              animate={{ x: ctaHovered ? 3 : 0, y: ctaHovered ? -3 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ display: "inline-flex", flexShrink: 0 }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
                <path d="M1 10L10 1M10 1H3M10 1V8"
                      stroke="#00D4FF" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
          </motion.a>
        )}
      </div>
    </motion.nav>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  Hamburger — two morphing lines (20px + 12px) → X via GSAP.
 *  Not the usual 3-line burger; reads as editorial / asymmetric.
 * ════════════════════════════════════════════════════════════════════════════ */
function Hamburger({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!line1Ref.current || !line2Ref.current) return;
    if (open) {
      gsap.to(line1Ref.current, {
        rotation: 45,  y:  3.5, width: 16, opacity: 1, duration: 0.35, ease: "power2.inOut",
      });
      gsap.to(line2Ref.current, {
        rotation: -45, y: -3.5, width: 16, opacity: 1, duration: 0.35, ease: "power2.inOut",
      });
    } else {
      gsap.to(line1Ref.current, {
        rotation: 0, y: 0, width: 20, opacity: 0.7, duration: 0.35, ease: "power2.inOut",
      });
      gsap.to(line2Ref.current, {
        rotation: 0, y: 0, width: 12, opacity: 0.4, duration: 0.35, ease: "power2.inOut",
      });
    }
  }, { dependencies: [open] });

  return (
    <button
      onClick={onToggle}
      aria-label={open ? "Zatvoriť menu" : "Otvoriť menu"}
      aria-expanded={open}
      style={{
        display:        "flex",
        flexDirection:  "column",
        gap:            "6px",
        padding:        "8px",
        background:     "transparent",
        border:         "none",
        alignItems:     "flex-start",
      }}
    >
      <div
        ref={line1Ref}
        style={{
          width:           20,
          height:          1,
          background:      "#fff",
          opacity:         0.7,
          transformOrigin: "center center",
        }}
      />
      <div
        ref={line2Ref}
        style={{
          width:           12,
          height:          1,
          background:      "#fff",
          opacity:         0.4,
          transformOrigin: "center center",
        }}
      />
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  MobileMenu — fullscreen "editorial" takeover.
 *    • clip-path reveal (top → bottom) then collapse on close
 *    • staggered slide-up of large nav items
 *    • per-item hover: 8px push right + cyan accent line on left
 *    • bottom bar with studio identity + status
 * ════════════════════════════════════════════════════════════════════════════ */
const menuItems = [
  { label: "Služby",    href: "#sluzby",    num: "01" },
  { label: "Portfólio", href: "#portfolio", num: "02" },
  { label: "Proces",    href: "#proces",    num: "03" },
  { label: "O nás",     href: "#o-nas",     num: "04" },
  { label: "Kontakt",   href: "#kontakt",   num: "05" },
] as const;

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemRefs   = useRef<(HTMLAnchorElement | null)[]>([]);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const actionsRef = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { label: "Služby",    href: "#sluzby",    num: "01" },
    { label: "Portfólio", href: "#portfolio", num: "02" },
    { label: "Proces",    href: "#proces",    num: "03" },
    { label: "O nás",     href: "#o-nas",     num: "04" },
    { label: "Kontakt",   href: "#kontakt",   num: "05" },
  ];

  useGSAP(() => {
    if (!overlayRef.current) return;

    if (open) {
      gsap.fromTo(overlayRef.current,
        { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" },
        { clipPath: "inset(0 0 0% 0)", pointerEvents: "auto",
          duration: 0.7, ease: "power4.inOut" },
      );
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55,
            ease: "power3.out", delay: 0.2 + i * 0.08 },
        );
      });
      numRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.4,
            ease: "power2.out", delay: 0.25 + i * 0.08 },
        );
      });
      gsap.fromTo(
        [actionsRef.current, bottomRef.current].filter(Boolean),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4,
          ease: "power2.out", delay: 0.7, stagger: 0.08 },
      );
    } else {
      gsap.to(itemRefs.current.filter(Boolean),
        { y: -16, opacity: 0, duration: 0.25,
          stagger: 0.04, ease: "power2.in" },
      );
      gsap.to([actionsRef.current, bottomRef.current].filter(Boolean),
        { opacity: 0, duration: 0.2 },
      );
      gsap.to(overlayRef.current,
        { clipPath: "inset(0 0 100% 0)", pointerEvents: "none",
          duration: 0.55, ease: "power4.inOut", delay: 0.15 },
      );
    }
  }, { dependencies: [open] });

  return (
    <div
      ref={overlayRef}
      aria-hidden={!open}
      style={{
        position:             "fixed",
        inset:                0,
        zIndex:               49,
        background:           "rgba(0, 4, 16, 0.96)",
        backdropFilter:       "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display:              "flex",
        flexDirection:        "column",
        clipPath:             "inset(0 0 100% 0)",
        pointerEvents:        "none",
        paddingTop:           "72px",
      }}
    >
      {/* Top gradient line */}
      <div aria-hidden style={{
        position:   "absolute",
        top:        0,
        left:       0,
        right:      0,
        height:     "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.5) 50%, transparent 100%)",
      }} />

      {/* NAV ITEMS */}
      <nav style={{
        flex:           1,
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "center",
        padding:        "0 28px",
        gap:            0,
      }}>
        {items.map((item, i) => (
          <div
            key={item.href}
            style={{ position: "relative" }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Separator line */}
            <div style={{
              height:     "1px",
              background: "rgba(255,255,255,0.07)",
              marginLeft: "32px",
            }} />

            <a
              ref={(el) => { itemRefs.current[i] = el; }}
              href={item.href}
              onClick={onClose}
              style={{
                display:        "flex",
                alignItems:     "center",
                gap:            "20px",
                padding:        "16px 0",
                textDecoration: "none",
                transform:      hoveredIndex === i ? "translateX(6px)" : "translateX(0)",
                transition:     "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Number */}
              <span
                ref={(el) => { numRefs.current[i] = el; }}
                style={{
                  fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize:      "9px",
                  color:         hoveredIndex === i ? "rgba(0,212,255,0.8)" : "rgba(255,255,255,0.2)",
                  letterSpacing: "0.12em",
                  flexShrink:    0,
                  width:         "24px",
                  transition:    "color 0.2s",
                }}
              >
                {item.num}
              </span>

              {/* Cyan accent dot */}
              <div aria-hidden style={{
                width:      "4px",
                height:     "4px",
                borderRadius: "50%",
                background: "#00D4FF",
                flexShrink: 0,
                opacity:    hoveredIndex === i ? 1 : 0,
                transform:  hoveredIndex === i ? "scale(1)" : "scale(0)",
                transition: "opacity 0.2s, transform 0.2s",
              }} />

              {/* Label */}
              <span style={{
                fontFamily:    "Syne, sans-serif",
                fontWeight:    900,
                fontSize:      "clamp(26px, 7.5vw, 52px)",
                letterSpacing: "-0.025em",
                textTransform: "uppercase",
                whiteSpace:    "nowrap" as const,
                color:         hoveredIndex === i ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                transition:    "color 0.25s ease",
                lineHeight:    1,
              }}>
                {item.label}
              </span>

              {/* Arrow — only on hover */}
              <span aria-hidden style={{
                marginLeft: "auto",
                color:      "#00D4FF",
                fontSize:   "16px",
                opacity:    hoveredIndex === i ? 1 : 0,
                transform:  hoveredIndex === i ? "translateX(0)" : "translateX(-8px)",
                transition: "opacity 0.2s, transform 0.25s",
                flexShrink: 0,
              }}>
                →
              </span>
            </a>
          </div>
        ))}

        {/* Bottom separator */}
        <div style={{
          height:     "1px",
          background: "rgba(255,255,255,0.07)",
          marginLeft: "32px",
        }} />
      </nav>

      {/* ACTION BUTTONS */}
      <div
        ref={actionsRef}
        style={{ display: "flex", gap: "10px", padding: "0 28px 20px" }}
      >
        <a href="tel:+421900000000" style={{
          flex:           1,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          gap:            "8px",
          padding:        "13px 0",
          border:         "1px solid rgba(0,212,255,0.3)",
          background:     "rgba(0,212,255,0.05)",
          textDecoration: "none",
          borderRadius:   0,
        }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M13 10.33v1.67a1 1 0 01-1.1.99A9.97 9.97 0 011 2.1 1 1 0 011.99 1h1.67c.45 0 .83.32.9.76.08.58.24 1.14.46 1.67a1 1 0 01-.23 1.06L3.09 5.2a8 8 0 004.72 4.72l.71-.71a1 1 0 011.06-.23c.53.22 1.09.38 1.67.46.45.07.77.46.75.89z"
              stroke="#00D4FF" strokeWidth="1.2" strokeLinecap="round"
            />
          </svg>
          <span style={{
            fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize:      "9px",
            letterSpacing: "0.2em",
            color:         "rgba(0,212,255,0.8)",
            textTransform: "uppercase",
          }}>Zavolať</span>
        </a>

        <a href="mailto:biben@sbdesign.sk" style={{
          flex:           1,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          gap:            "8px",
          padding:        "13px 0",
          border:         "1px solid rgba(255,255,255,0.1)",
          background:     "rgba(255,255,255,0.03)",
          textDecoration: "none",
          borderRadius:   0,
        }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="3" width="12" height="8" rx="1"
              stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
            <path d="M1 4l6 4.5L13 4"
              stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{
            fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize:      "9px",
            letterSpacing: "0.2em",
            color:         "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
          }}>Email</span>
        </a>
      </div>

      {/* BOTTOM BAR */}
      <div
        ref={bottomRef}
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "14px 28px 32px",
          borderTop:      "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Left: email */}
        <span style={{
          fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize:      "9px",
          color:         "rgba(255,255,255,0.2)",
          letterSpacing: "0.1em",
        }}>biben@sbdesign.sk</span>

        {/* Center: socials */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {([
            {
              label: "IG",
              href:  "https://instagram.com",
              path:  (
                <>
                  <rect x="2" y="2" width="12" height="12" rx="3.5"
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
                  <circle cx="8" cy="8" r="2.5"
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
                  <circle cx="11.2" cy="4.8" r="0.6"
                    fill="rgba(255,255,255,0.35)"/>
                </>
              ),
            },
            {
              label: "LI",
              href:  "https://linkedin.com",
              path:  (
                <>
                  <rect x="2" y="2" width="12" height="12" rx="2"
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
                  <path d="M5 7v4M5 5.5v.01M8 11V8.5a1.5 1.5 0 013 0V11M8 7v4"
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"
                    strokeLinecap="round"/>
                </>
              ),
            },
            {
              label: "FB",
              href:  "https://facebook.com",
              path:  (
                <>
                  <rect x="2" y="2" width="12" height="12" rx="2"
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
                  <path d="M9.5 5.5H8A1.5 1.5 0 006.5 7V11M9.5 8.5h-3"
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"
                    strokeLinecap="round"/>
                </>
              ),
            },
          ] as const).map(({ label, href, path }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ opacity: 0.6, transition: "opacity 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                {path}
              </svg>
            </a>
          ))}
        </div>

        {/* Right: availability */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div aria-hidden style={{
            width:        "5px",
            height:       "5px",
            borderRadius: "50%",
            background:   "#00D4FF",
          }} />
          <span style={{
            fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize:      "8px",
            color:         "rgba(0,212,255,0.5)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>Voľný</span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ScrollIndicator — 1px tall cyan segment sliding down inside a 44px clip.
 *  GSAP yoyo:false + repeat:-1 yields a one-way fall, then it resets and
 *  falls again — reads as a downward "pulse" rather than a ping-pong.
 * ════════════════════════════════════════════════════════════════════════════ */
function ScrollIndicator() {
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!innerRef.current) return;
      gsap.fromTo(
        innerRef.current,
        { y: "-100%" },
        {
          y:            "100%",
          duration:     1.2,
          ease:         "power1.inOut",
          repeat:       -1,
          repeatDelay:  0.3,
        },
      );
    },
    { dependencies: [] },
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        aria-hidden
        className="relative overflow-hidden"
        style={{
          width:      "1px",
          height:     "44px",
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <span
          ref={innerRef}
          className="absolute top-0 left-0 block"
          style={{
            width:      "1px",
            height:     "50%",
            background: "#00D4FF",
            willChange: "transform",
          }}
        />
      </div>
      <span
        style={{
          fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize:      "8px",
          letterSpacing: "0.2em",
          color:         "rgba(255,255,255,0.2)",
          textTransform: "uppercase",
        }}
      >
        scroll
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  useAtmosphericCanvas — three sinusoidally-orbiting radial-gradient orbs
 *  drawn each rAF onto a full-screen canvas via 2D `screen` compositing.
 *  Vignette is baked into the final pass so no extra DOM overlay is needed.
 *  The canvas element itself is a browser compositing layer — all blending
 *  happens on the GPU; the JS work per frame is three gradient objects +
 *  four fillRect calls, well under 0.1ms on any modern device.
 * ════════════════════════════════════════════════════════════════════════════ */
function useAtmosphericCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const orbs = [
      { baseX: 0.25, baseY: 0.42, r: 0.60, color: "15, 80, 200",  speedX: 0.0008, speedY: 0.0005, orbitX: 0.22, orbitY: 0.14, phase: 0   },
      { baseX: 0.75, baseY: 0.35, r: 0.42, color: "0, 180, 240",  speedX: 0.0010, speedY: 0.0008, orbitX: 0.18, orbitY: 0.20, phase: 2.1 },
      { baseX: 0.50, baseY: 0.72, r: 0.50, color: "5, 20, 100",   speedX: 0.0006, speedY: 0.0004, orbitX: 0.25, orbitY: 0.12, phase: 4.3 },
      { baseX: 0.80, baseY: 0.20, r: 0.30, color: "0, 100, 180",  speedX: 0.0012, speedY: 0.0007, orbitX: 0.12, orbitY: 0.15, phase: 1.2 },
    ];

    const draw = () => {
      t++;
      const w = canvas.width  / dpr;
      const h = canvas.height / dpr;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#010818";
      ctx.fillRect(0, 0, w, h);

      orbs.forEach((orb) => {
        const cx     = (orb.baseX + Math.sin(t * orb.speedX + orb.phase) * orb.orbitX) * w;
        const cy     = (orb.baseY + Math.cos(t * orb.speedY + orb.phase) * orb.orbitY) * h;
        const radius = orb.r * Math.max(w, h);
        const grad   = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0,    `rgba(${orb.color}, 0.35)`);
        grad.addColorStop(0.35, `rgba(${orb.color}, 0.15)`);
        grad.addColorStop(0.7,  `rgba(${orb.color}, 0.04)`);
        grad.addColorStop(1,    `rgba(${orb.color}, 0)`);
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      ctx.globalCompositeOperation = "source-over";
      const vignette = ctx.createRadialGradient(
        w * 0.5, h * 0.45, h * 0.05,
        w * 0.5, h * 0.45, h * 0.90,
      );
      vignette.addColorStop(0,   "rgba(0,0,0,0)");
      vignette.addColorStop(0.5, "rgba(0,0,10,0.15)");
      vignette.addColorStop(1,   "rgba(0,0,15,0.82)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  LiveClock — Bratislava local time, ticks every second.
 * ════════════════════════════════════════════════════════════════════════════ */
function LiveClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("sk-SK", {
        hour:   "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }));
      setDate(now.toLocaleDateString("sk-SK", {
        day:   "2-digit",
        month: "2-digit",
        year:  "numeric",
      }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{
        fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize:      "9px",
        letterSpacing: "0.18em",
        color:         "rgba(255,255,255,0.2)",
        textTransform: "uppercase",
      }}>
        Bratislava, SK
      </span>
      <span style={{
        fontFamily:         "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize:           "13px",
        letterSpacing:      "0.12em",
        color:              "rgba(255,255,255,0.45)",
        fontVariantNumeric: "tabular-nums",
      }}>
        {time}
      </span>
      <span style={{
        fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize:      "9px",
        letterSpacing: "0.12em",
        color:         "rgba(255,255,255,0.18)",
      }}>
        {date}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SplitText — each character as its own inline-block so GSAP can animate
 *  transform + filter per character for the blur wave.
 * ════════════════════════════════════════════════════════════════════════════ */
function SplitText({ text, style }: { text: string; style: React.CSSProperties }) {
  return (
    <span style={{ display: "block", ...style }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-char
          style={{
            display:              "inline-block",
            willChange:           "transform, filter",
            background:           "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 40%, #9BADD0 70%, #1A2236 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/* Shared headline style */
const headlineStyle: React.CSSProperties = {
  fontFamily:    "Syne, sans-serif",
  fontWeight:    900,
  fontSize:      "clamp(24px, 7.8vw, 118px)",
  lineHeight:    0.88,
  letterSpacing: "-0.035em",
  textTransform: "uppercase" as const,
  textAlign:     "center",
  display:       "block",
};

/* ════════════════════════════════════════════════════════════════════════════
 *  CTAButton — animated "Začať projekt" link with line sweep + letter spread.
 * ════════════════════════════════════════════════════════════════════════════ */
function CTAButton() {
  const [hovered, setHovered] = useState(false);
  const lineRef  = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!lineRef.current || !textRef.current || !arrowRef.current) return;

    if (hovered) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.35, ease: "power2.out" },
      );
      gsap.to(textRef.current, {
        letterSpacing: "0.28em",
        duration:      0.4,
        ease:          "power2.out",
      });
      gsap.to(arrowRef.current, {
        x:        6,
        opacity:  1,
        duration: 0.3,
        ease:     "power2.out",
      });
    } else {
      gsap.to(lineRef.current, {
        scaleX:          0,
        transformOrigin: "right center",
        duration:        0.25,
        ease:            "power2.in",
      });
      gsap.to(textRef.current, {
        letterSpacing: "0.22em",
        duration:      0.3,
        ease:          "power2.in",
      });
      gsap.to(arrowRef.current, {
        x:        0,
        opacity:  0.5,
        duration: 0.25,
        ease:     "power2.in",
      });
    }
  }, { dependencies: [hovered] });

  return (
    <a
      href="#kontakt"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:              "inline-flex",
        alignItems:           "center",
        gap:                  "14px",
        padding:              "16px 36px",
        border:               "1px solid rgba(255,255,255,0.15)",
        background:           "rgba(255,255,255,0.03)",
        backdropFilter:       "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        position:             "relative",
        textDecoration:       "none",
        borderRadius:         0,
        overflow:             "hidden",
      }}
    >
      {/* Animated bottom line */}
      <div
        ref={lineRef}
        style={{
          position:        "absolute",
          bottom:          0,
          left:            0,
          width:           "100%",
          height:          "1px",
          background:      "linear-gradient(90deg, transparent, #00D4FF, transparent)",
          transform:       "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
      {/* Top-left corner accent */}
      <div style={{
        position:    "absolute",
        top:         0,
        left:        0,
        width:       "8px",
        height:      "8px",
        borderTop:   "1px solid rgba(0,212,255,0.6)",
        borderLeft:  "1px solid rgba(0,212,255,0.6)",
      }} />
      {/* Bottom-right corner accent */}
      <div style={{
        position:     "absolute",
        bottom:       0,
        right:        0,
        width:        "8px",
        height:       "8px",
        borderBottom: "1px solid rgba(0,212,255,0.6)",
        borderRight:  "1px solid rgba(0,212,255,0.6)",
      }} />
      {/* Button text */}
      <span
        ref={textRef}
        style={{
          fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize:      "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.85)",
        }}
      >
        Začať projekt
      </span>
      {/* Arrow */}
      <span
        ref={arrowRef}
        style={{
          color:      "#00D4FF",
          fontSize:   "14px",
          opacity:    0.5,
          lineHeight: 1,
        }}
      >
        →
      </span>
    </a>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  HeroSection — full cinematic stage. Canvas background → centered word
 *  stack → bottom bar (clock / scroll / CTA).
 * ════════════════════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Mobile menu open/close */
  const [menuOpen, setMenuOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useAtmosphericCanvas(canvasRef);

  /* Magnetic headline state */
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const [word1Pos, setWord1Pos] = useState({ x: 0, y: 0 });
  const [word2Pos, setWord2Pos] = useState({ x: 0, y: 0 });

  const handleWordMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement | null>,
    setter: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  ) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const distX = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const distY = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    setter({ x: distX * 10, y: distY * 6 });
  };

  const handleWordMouseLeave = (
    setter: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  ) => setter({ x: 0, y: 0 });

  /* Per-character blur + scale wave */
  useGSAP(() => {
    const getChars = () => [
      ...(word1Ref.current ? Array.from(word1Ref.current.querySelectorAll("[data-char]")) : []),
      ...(word2Ref.current ? Array.from(word2Ref.current.querySelectorAll("[data-char]")) : []),
    ] as HTMLElement[];

    const runWave = () => {
      const chars = getChars();
      if (!chars.length) return;

      gsap.set(chars, { filter: "blur(0px)", scale: 1 });

      chars.forEach((char, i) => {
        gsap.timeline({ delay: i * 0.07 })
          .to(char, {
            filter:   "blur(4px)",
            scale:    1.12,
            duration: 0.18,
            ease:     "sine.in",
          })
          .to(char, {
            filter:   "blur(0px)",
            scale:    1,
            duration: 0.45,
            ease:     "sine.out",
          });
      });
    };

    const t       = setTimeout(runWave, 2000);
    const interval = setInterval(runWave, 5000);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, { dependencies: [] });

  return (
    <>
      {/* Fixed navigation */}
      <Navigation
        isMobile={isMobile}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((v) => !v)}
      />

      {/* Fullscreen mobile menu overlay (only mounted/visible on mobile) */}
      {isMobile && (
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}

      <section
        id="hero"
        aria-label="Hero — SB DESIGN"
        className="relative w-full min-h-screen"
        style={{}}
      >

        {/* ── z-0 · Atmospheric canvas background ─────────────────────── */}
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: "absolute",
            top:      0,
            left:     0,
            width:    "100%",
            height:   "100%",
            zIndex:   0,
          }}
        />

        {/* ── z-10 · Center stack — eyebrow / words / subtitle ────────── */}
        <div
          className="absolute left-0 right-0 z-10 flex flex-col items-center px-6 w-full"
          style={{ top: isMobile ? "45%" : "50%", transform: "translateY(-50%)" }}
        >

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{
              fontFamily:    "ui-monospace, 'Courier New', monospace",
              fontSize:      "10px",
              letterSpacing: "0.28em",
              color:         "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom:  "32px",
            }}
          >
            SB | DESIGN STUDIO
          </motion.p>

          {/* Headline — wrapper */}
          <div style={{
            position:     "relative",
            paddingLeft:  "24px",
            paddingRight: "24px",
            width:        "100%",
            boxSizing:    "border-box",
            textAlign:    "center",
            overflow:     "hidden",
          }}>

            {/* Word 1 */}
            <motion.div
              ref={word1Ref}
              initial={{ opacity: 0, y: 55, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: word1Pos.y, x: word1Pos.x, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.85, ease: EASE, x: { type: "spring", stiffness: 180, damping: 18, mass: 0.8 }, y: { type: "spring", stiffness: 180, damping: 18, mass: 0.8 } }}
              onMouseMove={(e) => handleWordMouseMove(e, word1Ref, setWord1Pos)}
              onMouseLeave={() => handleWordMouseLeave(setWord1Pos)}
              style={{ display: "block", willChange: "transform" }}
            >
              <SplitText text="DIGITÁLNY" style={headlineStyle} />
            </motion.div>

            {/* Word 2 */}
            <motion.div
              ref={word2Ref}
              initial={{ opacity: 0, y: 55, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: word2Pos.y, x: word2Pos.x, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 1.05, ease: EASE, x: { type: "spring", stiffness: 180, damping: 18, mass: 0.8 }, y: { type: "spring", stiffness: 180, damping: 18, mass: 0.8 } }}
              onMouseMove={(e) => handleWordMouseMove(e, word2Ref, setWord2Pos)}
              onMouseLeave={() => handleWordMouseLeave(setWord2Pos)}
              style={{ display: "block", willChange: "transform" }}
            >
              <SplitText text="MARKETING" style={headlineStyle} />
            </motion.div>

          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.5 }}
            style={{
              fontFamily:    "Syne, sans-serif",
              fontSize:      "clamp(13px, 1.1vw, 16px)",
              letterSpacing: "0.18em",
              color:         "rgba(255,255,255,0.32)",
              textTransform: "uppercase",
              marginTop:     "36px",
            }}
          >
            Webové riešenia na mieru.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: "48px" }}
          >
            <CTAButton />
          </motion.div>
        </div>

        {/* ── z-10 · Bottom bar ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-0 left-0 right-0 z-10"
        >
          {/* Hairline divider — masked at edges */}
          <div
            aria-hidden
            className="w-full"
            style={{
              height:     "1px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.07) 15%, rgba(255,255,255,0.07) 85%, transparent)",
            }}
          />

          <div style={{
            display:        "flex",
            alignItems:     "flex-end",
            justifyContent: isMobile ? "center" : "space-between",
            padding:        "24px clamp(16px, 4vw, 48px) clamp(24px, 4vw, 40px)",
          }}>

            {/* LEFT — live clock, hidden on mobile */}
            <div style={{ display: isMobile ? "none" : "block" }}>
              <LiveClock />
            </div>

            {/* CENTER — scroll indicator, always visible */}
            <div>
              <ScrollIndicator />
            </div>

            {/* RIGHT — Contact signal, hidden on mobile */}
            <div style={{ display: isMobile ? "none" : "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
              {/* Line 1: availability dot + label */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <motion.div
                  aria-hidden
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width:        "6px",
                    height:       "6px",
                    borderRadius: "50%",
                    background:   "#00D4FF",
                    flexShrink:   0,
                  }}
                />
                <span style={{
                  fontFamily:    "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize:      "8px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color:         "rgba(255,255,255,0.28)",
                }}>
                  KAPACITA SA MÍŇA
                </span>
              </div>
              {/* Line 2: email */}
              <a
                href="mailto:biben@sbdesign.sk"
                className="transition-all duration-200"
                style={{
                  fontFamily:     "Syne, sans-serif",
                  fontWeight:     400,
                  fontSize:       "12px",
                  letterSpacing:  "0.05em",
                  color:          "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  e.currentTarget.style.textDecoration = "underline";
                  e.currentTarget.style.textUnderlineOffset = "3px";
                  e.currentTarget.style.textDecorationColor = "rgba(0,212,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                biben@sbdesign.sk
              </a>
            </div>
          </div>
        </motion.div>

      </section>
    </>
  );
}
