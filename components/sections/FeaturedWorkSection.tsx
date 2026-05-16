// FILE: components/sections/FeaturedWorkSection.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ════════════════════════════════════════════════════════════════════════════
 *  Data
 * ════════════════════════════════════════════════════════════════════════════ */
interface Project {
  id:          string;
  title:       string;
  category:    string;
  url:         string;
  description: string;
  tags:        string[];
  year:        string;
  color:       string;
  accentColor: string;
  image:       string;
  stat:        { value: string; label: string };
}

const projects: Project[] = [
  {
    id:          "01",
    title:       "ProPsyché",
    category:    "Web Design & Development",
    url:         "https://www.propsyche.sk",
    description: "Prémiový web pre psychoanalytickú psychoterapeutku. Jemná, dôveryhodná estetika s dôrazom na konverziu návštevníkov na klientov.",
    tags:        ["WordPress", "Custom Design", "SEO"],
    year:        "2025",
    color:       "#1a0a2e",
    accentColor: "#8b5cf6",
    image:       "/propsyche.png",
    stat:        { value: "3×", label: "viac dopytov" },
  },
  {
    id:          "02",
    title:       "Výťahy Barborík",
    category:    "Web Design & Development",
    url:         "https://vytahybarborik.sk",
    description: "Firemný web pre rodinnú firmu s 30-ročnou tradíciou. Custom HTML/CSS/JS — žiadny WordPress, maximálny výkon a rýchlosť načítania.",
    tags:        ["Custom Code", "HTML/CSS/JS", "Performance"],
    year:        "2025",
    color:       "#0a1628",
    accentColor: "#0057FF",
    image:       "/vytahybarborik.png",
    stat:        { value: "98", label: "PageSpeed skóre" },
  },
  {
    id:          "03",
    title:       "STAREA Reality",
    category:    "Web Design & Development",
    url:         "https://www.starea.sk",
    description: "Realitná kancelária s vlastným systémom na správu nehnuteľností. Elementor custom development s integráciou pokročilého filtrovania ponúk.",
    tags:        ["WordPress", "Elementor", "Custom Filters"],
    year:        "2026",
    color:       "#0a1a10",
    accentColor: "#10b981",
    image:       "/starea.png",
    stat:        { value: "47+", label: "aktívnych ponúk" },
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  ProjectCard
 * ════════════════════════════════════════════════════════════════════════════ */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      style={{
        position:             "relative",
        overflow:             "hidden",
        border:               `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`,
        background:           "rgba(0,8,24,0.6)",
        backdropFilter:       "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition:           "border-color 0.3s, transform 0.4s",
        transform:            hovered ? "translateY(-6px)" : "translateY(0)",
        cursor:               "default",
      }}
    >
      {/* IMAGE */}
      <div style={{ position: "relative", height: "clamp(180px,22vw,300px)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          style={{
            width:          "100%",
            height:         "115%",
            objectFit:      "cover",
            objectPosition: "top center",
            transform:      hovered ? "scale(1.04)" : "scale(1)",
            transition:     "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            willChange:     "transform",
            display:        "block",
          }}
        />

        {/* Bottom fade */}
        <div style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(to bottom, transparent 40%, rgba(0,8,24,0.7) 100%)",
          pointerEvents: "none",
        }} />

        {/* Accent tint on hover */}
        <div style={{
          position:      "absolute",
          inset:         0,
          background:    project.accentColor + "18",
          opacity:       hovered ? 1 : 0,
          transition:    "opacity 0.4s",
          pointerEvents: "none",
        }} />

        {/* Number — top left */}
        <span style={{
          position:             "absolute",
          top:                  "14px",
          left:                 "16px",
          fontFamily:           "monospace",
          fontSize:             "11px",
          letterSpacing:        "0.2em",
          fontWeight:           "bold",
          color:                "#FFFFFF",
          opacity:              1,
          background:           "rgba(0,0,0,0.5)",
          padding:              "3px 8px",
          backdropFilter:       "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}>{project.id}</span>

        {/* Year — top right */}
        <span style={{
          position:             "absolute",
          top:                  "14px",
          right:                "16px",
          fontFamily:           "monospace",
          fontSize:             "10px",
          letterSpacing:        "0.15em",
          color:                "rgba(255,255,255,0.8)",
          background:           "rgba(0,0,0,0.5)",
          padding:              "3px 8px",
          backdropFilter:       "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}>{project.year}</span>
      </div>

      {/* CONTENT */}
      <div style={{
        padding:       "clamp(20px,2vw,28px)",
        display:       "flex",
        flexDirection: "column",
        gap:           "10px",
      }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily:    "monospace",
              fontSize:      "8px",
              letterSpacing: "0.12em",
              color:         "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              padding:       "3px 7px",
              border:        "1px solid rgba(255,255,255,0.1)",
            }}>{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    "Syne, sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(22px,2.5vw,34px)",
          color:         "#FFFFFF",
          letterSpacing: "-0.025em",
          lineHeight:    0.95,
          margin:        0,
        }}>{project.title}</h3>

        {/* Description */}
        <p style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 400,
          fontSize:   "clamp(12px,1vw,14px)",
          color:      "rgba(255,255,255,0.4)",
          lineHeight: 1.65,
          margin:     0,
        }}>{project.description}</p>

        {/* Bottom row */}
        <div style={{
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          marginTop:       "8px",
          paddingTop:      "16px",
          borderTop:       "1px solid rgba(255,255,255,0.07)",
        }}>
          {/* Stat */}
          <div>
            <span style={{
              fontFamily:    "Syne, sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(20px,2vw,28px)",
              color:         project.accentColor,
              letterSpacing: "-0.02em",
            }}>{project.stat.value} </span>
            <span style={{
              fontFamily:    "monospace",
              fontSize:      "8px",
              letterSpacing: "0.12em",
              color:         "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
            }}>{project.stat.label}</span>
          </div>

          {/* Link */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            "6px",
              textDecoration: "none",
              fontFamily:     "monospace",
              fontSize:       "9px",
              letterSpacing:  "0.15em",
              color:          hovered ? "#FFFFFF" : "rgba(255,255,255,0.35)",
              textTransform:  "uppercase",
              transition:     "color 0.2s",
            }}
          >
            Otvoriť
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 8.5L8.5 1.5M8.5 1.5H4M8.5 1.5V6"
                stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position:        "absolute",
        bottom:          0,
        left:            0,
        right:           0,
        height:          "2px",
        background:      `linear-gradient(to right, transparent, ${project.accentColor}, transparent)`,
        transform:       `scaleX(${hovered ? 1 : 0})`,
        transition:      "transform 0.4s ease",
        transformOrigin: "center",
        pointerEvents:   "none",
      }} />
    </motion.article>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  FeaturedWorkSection
 * ════════════════════════════════════════════════════════════════════════════ */
export default function FeaturedWorkSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      aria-label="Vybrané projekty — SB Design"
      style={{
        position:   "relative",
        background: "#010818",
        color:      "#FFFFFF",
        padding:    "80px clamp(24px,6vw,96px)",
      }}
    >
      {/* ── HEADER ── */}
      <header style={{ marginBottom: "48px" }}>
        <p style={{
          fontFamily:    "monospace",
          fontSize:      "9px",
          letterSpacing: "0.3em",
          color:         "rgba(255,255,255,0.2)",
          textTransform: "uppercase",
          margin:        "0 0 16px 0",
        }}>
          Vybrané projekty
        </p>

        <div style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "flex-end",
          gap:            "32px",
          flexWrap:       "wrap",
        }}>
          <h2 style={{
            fontFamily:    "Syne, sans-serif",
            fontWeight:    900,
            fontSize:      "clamp(48px,7vw,112px)",
            color:         "#FFFFFF",
            letterSpacing: "-0.035em",
            lineHeight:    0.88,
            margin:        0,
          }}>
            Naša práca.
          </h2>

          {!isMobile && (
            <p style={{
              fontFamily:    "Syne, sans-serif",
              fontWeight:    400,
              fontSize:      "clamp(14px,1.1vw,17px)",
              color:         "rgba(255,255,255,0.35)",
              maxWidth:      "280px",
              alignSelf:     "flex-end",
              paddingBottom: "8px",
              margin:        0,
              lineHeight:    1.5,
            }}>
              Každý projekt je unikátny.
            </p>
          )}
        </div>
      </header>

      {/* ── CARDS GRID ── */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap:                 "20px",
        width:               "100%",
      }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        gap:            "24px",
        flexWrap:       "wrap",
        marginTop:      "60px",
        paddingTop:     "40px",
        borderTop:      "1px solid rgba(255,255,255,0.06)",
      }}>
        <a
          href="/portfolio"
          style={{
            fontFamily:     "Syne, sans-serif",
            fontWeight:     700,
            fontSize:       "15px",
            color:          "rgba(255,255,255,0.5)",
            textDecoration: "none",
            transition:     "color 0.2s",
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "8px",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
        >
          Pozrite si celé portfólio →
        </a>

        <span style={{
          fontFamily:    "monospace",
          fontSize:      "10px",
          letterSpacing: "0.2em",
          color:         "rgba(255,255,255,0.2)",
          textTransform: "uppercase",
        }}>
          03 projektov
        </span>
      </div>
    </section>
  );
}
