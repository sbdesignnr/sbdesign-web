// FILE: components/layout/Navigation.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Služby",    href: "#services"   },
  { label: "Portfólio", href: "#portfolio"  },
  { label: "Proces",    href: "#process"    },
  { label: "Kontakt",   href: "#contact"    },
] as const;

/* ════════════════════════════════════════════════════════════════════════════
 *  Navigation — fades in 1s after loader. Scroll past 60px:
 *  background fills with blurred black, border-bottom hairline appears.
 *  Pure CSS transitions on background/border, no JS per-scroll work.
 * ════════════════════════════════════════════════════════════════════════════ */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms] ease-out"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter:  scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom:    scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="h-16 md:h-20 px-6 md:px-10 flex items-center justify-between">

        {/* LEFT — logo */}
        <a href="#top" aria-label="SB DESIGN — domov" className="shrink-0" data-cursor="link">
          <img
            src="/SB-Design-Logo-1-5.png"
            alt="SB Design"
            className="h-8 w-auto"
            draggable={false}
          />
        </a>

        {/* CENTER — nav links */}
        <nav aria-label="Hlavná navigácia" className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              data-cursor="link"
              className="transition-colors duration-200"
              style={{
                fontFamily:    "Syne, sans-serif",
                fontWeight:    700,
                fontSize:      "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.55)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* RIGHT — CTA */}
        <a
          href="#contact"
          data-cursor="link"
          className="transition-all duration-[250ms] ease-out"
          style={{
            fontFamily:    "Syne, sans-serif",
            fontWeight:    700,
            fontSize:      "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "rgba(0,212,255,0.9)",
            border:        "1px solid rgba(0,212,255,0.4)",
            padding:       "10px 24px",
            borderRadius:  "9999px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background  = "rgba(0,212,255,0.08)";
            e.currentTarget.style.borderColor = "#00D4FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background  = "transparent";
            e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
          }}
        >
          Konzultácia
        </a>
      </div>
    </motion.header>
  );
}
