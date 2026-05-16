// FILE: components/sections/ServicesSection.tsx
"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  "Webový dizajn",
  "Firemné weby",
  "E-commerce",
  "Branding",
  "Landing Pages",
  "SEO Optimalizácia",
  "Rezervačné systémy",
  "Custom Animácie",
  "Next.js Development",
  "Webflow",
] as const;

/* ════════════════════════════════════════════════════════════════════════════
 *  ServicesSection — eyebrow + headline + two horizontal marquee rows.
 *  Pure CSS keyframes for the scroll → no GSAP, no JS frame cost.
 *  Content is duplicated inline so translateX(-50%) loops seamlessly.
 * ════════════════════════════════════════════════════════════════════════════ */
export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="Naše služby"
      className="w-full bg-black overflow-hidden"
    >
      <div className="px-6 md:px-10 py-[140px] max-w-[1400px] mx-auto">

        {/* Eyebrow + headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-20"
        >
          <div
            style={{
              fontFamily:    "Syne, sans-serif",
              fontWeight:    700,
              fontSize:      "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "rgba(0,212,255,0.7)",
              marginBottom:  "32px",
            }}
          >
            Naše služby
          </div>
          <h2
            style={{
              fontFamily:    "Syne, sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(40px, 6vw, 96px)",
              lineHeight:    0.92,
              letterSpacing: "-0.025em",
              color:         "#fff",
            }}
          >
            Riešenia pre firmy,<br />ktoré to myslia vážne.
          </h2>
        </motion.div>

        {/* Marquee row A */}
        <div className="services-marquee-mask">
          <div className="services-marquee services-marquee--a">
            <MarqueeContent />
            <MarqueeContent aria-hidden />
          </div>
        </div>

        {/* Marquee row B — reverse direction, slower */}
        <div className="services-marquee-mask mt-6">
          <div className="services-marquee services-marquee--b">
            <MarqueeContent />
            <MarqueeContent aria-hidden />
          </div>
        </div>
      </div>

      <style>{`
        .services-marquee-mask {
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
                  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }
        .services-marquee {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        @keyframes serv-marquee-l { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes serv-marquee-r { from { transform: translateX(-50%); } to { transform: translateX(0); }    }
        .services-marquee--a { animation: serv-marquee-l 30s linear infinite; }
        .services-marquee--b { animation: serv-marquee-r 38s linear infinite; }
        .services-marquee:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}

/* Inner row content — extracted so it can be rendered twice for the loop */
function MarqueeContent(props: { "aria-hidden"?: boolean }) {
  return (
    <ul
      className="flex items-center"
      aria-hidden={props["aria-hidden"]}
      style={{ paddingRight: "48px" }}
    >
      {SERVICES.map((s, idx) => (
        <li
          key={`${s}-${idx}`}
          className="flex items-center"
          style={{
            fontFamily:    "Syne, sans-serif",
            fontWeight:    700,
            fontSize:      "15px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:         "#fff",
            whiteSpace:    "nowrap",
            paddingRight:  "48px",
          }}
        >
          {s}
          <span
            aria-hidden
            className="ml-12 inline-block w-1 h-1 rounded-full"
            style={{ background: "rgba(0,212,255,0.6)" }}
          />
        </li>
      ))}
    </ul>
  );
}
