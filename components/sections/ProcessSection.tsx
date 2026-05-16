"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num:      "01",
    title:    "Konzultácia",
    desc:     "Bezplatné stretnutie. Pochopíme váš biznis, ciele a konkurenciu.",
    duration: "1–2 dni",
    output:   "Cenová ponuka",
    color:    "#00D4FF",
  },
  {
    num:      "02",
    title:    "Návrh",
    desc:     "Unikátny dizajn na mieru v interaktívnom Figma prototype.",
    duration: "5–7 dní",
    output:   "Figma prototyp",
    color:    "#0057FF",
  },
  {
    num:      "03",
    title:    "Vývoj",
    desc:     "Čistý kód. Next.js alebo custom HTML/CSS/JS. PageSpeed 95+.",
    duration: "10–21 dní",
    output:   "Web na testovacej doméne",
    color:    "#4A8FFF",
  },
  {
    num:      "04",
    title:    "Spustenie",
    desc:     "Nasadenie, školenie a 30-dňová podpora. Váš web pracuje za vás.",
    duration: "1–2 dni",
    output:   "Živý web + prístupy",
    color:    "#00D4FF",
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      padding:  "80px clamp(24px,6vw,96px)",
      position: "relative",
    }}>

      {/* HEADER */}
      <div style={{
        display:        "flex",
        flexDirection:  isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems:     isMobile ? "flex-start" : "flex-end",
        marginBottom:   "56px",
        gap:            isMobile ? "24px" : "0",
        flexWrap:       "wrap",
      }}>
        <div>
          <p style={{
            fontFamily:    "monospace",
            fontSize:      "9px",
            letterSpacing: "0.3em",
            color:         "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
            marginBottom:  "12px",
            margin:        "0 0 12px 0",
          }}>PROCES SPOLUPRÁCE</p>
          <h2 style={{
            fontFamily:    "Syne, sans-serif",
            fontWeight:    900,
            fontSize:      "clamp(40px,6vw,88px)",
            lineHeight:    0.88,
            letterSpacing: "-0.035em",
            color:         "#FFFFFF",
            margin:        0,
          }}>
            Od nápadu<br />
            k výsledku.
          </h2>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{
            fontFamily:    "monospace",
            fontSize:      "9px",
            letterSpacing: "0.2em",
            color:         "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
            margin:        "0 0 6px 0",
          }}>Priemerná doba</p>
          <p style={{
            fontFamily:           "Syne, sans-serif",
            fontWeight:           900,
            fontSize:             "clamp(32px,4vw,52px)",
            background:           "linear-gradient(135deg, #0057FF, #00D4FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
            color:                "transparent",
            letterSpacing:        "-0.025em",
            lineHeight:           1,
            margin:               0,
          }}>3–4 týždne</p>
        </div>
      </div>

      {/* STEPS */}
      <div style={{ position: "relative" }}>
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            onMouseEnter={() => setActiveStep(i)}
            onMouseLeave={() => setActiveStep(null)}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-40px" }}
            style={{
              display:             "grid",
              gridTemplateColumns: isMobile ? "32px 1fr" : "48px 1fr 180px 120px",
              gap:                 "0 32px",
              alignItems:          "center",
              padding:             isMobile ? "20px 0" : "28px 0",
              borderTop:           "1px solid rgba(255,255,255,0.07)",
              borderBottom:        i === steps.length - 1
                ? "1px solid rgba(255,255,255,0.07)"
                : "none",
              background:          activeStep === i
                ? "rgba(0,87,255,0.03)"
                : "transparent",
              transition:          "background 0.3s",
              cursor:              "default",
              position:            "relative",
            }}
          >
            {/* Hover accent line — left edge of section */}
            <div style={{
              position:   "absolute",
              left:       "calc(-1 * clamp(24px,6vw,96px))",
              top:        0,
              bottom:     0,
              width:      "2px",
              background: step.color,
              opacity:    activeStep === i ? 1 : 0,
              transition: "opacity 0.3s",
            }} />

            {/* COL 1: Number */}
            <span style={{
              fontFamily:    "monospace",
              fontSize:      "11px",
              letterSpacing: "0.15em",
              color:         activeStep === i
                ? step.color
                : "rgba(255,255,255,0.2)",
              transition: "color 0.3s",
            }}>{step.num}</span>

            {/* COL 2: Title + desc */}
            <div>
              <h3 style={{
                fontFamily:    "Syne, sans-serif",
                fontWeight:    900,
                fontSize:      "clamp(20px,2.2vw,32px)",
                color:         activeStep === i ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                letterSpacing: "-0.02em",
                lineHeight:    1,
                margin:        "0 0 6px 0",
                transition:    "color 0.3s",
              }}>{step.title}</h3>
              <p style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 400,
                fontSize:   "clamp(12px,1vw,14px)",
                color:      "rgba(255,255,255,0.35)",
                lineHeight: 1.55,
                maxWidth:   "480px",
                margin:     0,
              }}>{step.desc}</p>
              {isMobile && (
                <p style={{
                  fontFamily:    "monospace",
                  fontSize:      "9px",
                  letterSpacing: "0.15em",
                  color:         step.color,
                  opacity:       0.6,
                  marginTop:     "6px",
                  margin:        "6px 0 0 0",
                }}>{step.duration}</p>
              )}
            </div>

            {/* COL 3: Output */}
            <div style={{ display: isMobile ? "none" : "block" }}>
              <p style={{
                fontFamily:    "monospace",
                fontSize:      "8px",
                letterSpacing: "0.2em",
                color:         "rgba(255,255,255,0.18)",
                textTransform: "uppercase",
                margin:        "0 0 5px 0",
              }}>Výstup</p>
              <p style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize:   "clamp(12px,1vw,14px)",
                color:      "rgba(255,255,255,0.5)",
                lineHeight: 1.4,
                margin:     0,
              }}>{step.output}</p>
            </div>

            {/* COL 4: Duration */}
            <div style={{ textAlign: "right", display: isMobile ? "none" : "block" }}>
              <p style={{
                fontFamily:    "monospace",
                fontSize:      "8px",
                letterSpacing: "0.2em",
                color:         "rgba(255,255,255,0.18)",
                textTransform: "uppercase",
                margin:        "0 0 5px 0",
              }}>Trvanie</p>
              <p style={{
                fontFamily:    "Syne, sans-serif",
                fontWeight:    900,
                fontSize:      "clamp(14px,1.4vw,20px)",
                color:         activeStep === i
                  ? step.color
                  : "rgba(255,255,255,0.55)",
                letterSpacing: "-0.01em",
                transition:    "color 0.3s",
                whiteSpace:    "nowrap",
                margin:        0,
              }}>{step.duration}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <div style={{
        display:        "flex",
        flexDirection:  isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems:     isMobile ? "flex-start" : "center",
        marginTop:      "48px",
        gap:            isMobile ? "20px" : "24px",
        flexWrap:       "wrap",
      }}>
        <p style={{
          fontFamily:    "Syne, sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(24px,3.5vw,48px)",
          color:         "#FFFFFF",
          letterSpacing: "-0.025em",
          margin:        0,
        }}>Pripravený začať?</p>

        <a
          href="#kontakt"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "10px",
            padding:        "14px 32px",
            border:         "1px solid rgba(0,212,255,0.3)",
            background:     "transparent",
            fontFamily:     "monospace",
            fontSize:       "10px",
            letterSpacing:  "0.2em",
            color:          "rgba(0,212,255,0.8)",
            textTransform:  "uppercase",
            textDecoration: "none",
            borderRadius:   0,
            transition:     "all 0.25s ease",
            flexShrink:     0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#00D4FF";
            e.currentTarget.style.background   = "rgba(0,212,255,0.06)";
            e.currentTarget.style.color        = "#00D4FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
            e.currentTarget.style.background   = "transparent";
            e.currentTarget.style.color        = "rgba(0,212,255,0.8)";
          }}
        >
          Konzultácia zdarma
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 1M9 1H3.5M9 1V6.5"
              stroke="currentColor" strokeWidth="1.3"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

    </section>
  );
}
