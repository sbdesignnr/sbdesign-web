"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

function Card({ project, index, featured }: { project: Project; index: number; featured?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.06, ease: EASE }}
      className={featured ? "md:col-span-2" : ""}
    >
      <Link
        href={`/projekty/${project.slug}`}
        data-cursor-label="Case study"
        className="group relative block overflow-hidden rounded-2xl border border-line bg-ink-800/40 transition-colors duration-500 hover:border-line-strong"
      >
        {/* glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-50"
          style={{ background: `radial-gradient(ellipse at top, ${project.accent}66, transparent 60%)` }}
        />
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,6,12,0.85), transparent 55%)" }} />
          {/* hover tint */}
          <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `${project.accent}14` }} />

          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="rounded-full bg-ink-950/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-marble">
              {project.category}
            </span>
          </div>
          <span className="absolute right-5 top-5 font-mono text-[11px] text-marble-dim">{project.year}</span>
        </div>

        <div className="relative p-6 md:p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-marble md:text-3xl">{project.title}</h3>
              <p className="mt-2 max-w-md text-sm text-marble-dim">{project.tagline}</p>
            </div>
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45"
              style={{ borderColor: project.accent }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: project.accent }}>
                <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.discipline.slice(0, 4).map((d) => (
              <span key={d} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-marble-muted">
                {d}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["Všetky", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [filter, setFilter] = useState("Všetky");

  const filtered = filter === "Všetky" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* filters */}
      <div className="mb-12 flex flex-wrap gap-2.5">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className="rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors"
            style={{
              borderColor: filter === c ? "var(--color-azure)" : "var(--color-line-strong)",
              background: filter === c ? "var(--color-azure)" : "transparent",
              color: filter === c ? "#fff" : "var(--color-marble-dim)",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <Card key={p.slug} project={p} index={i} featured={filter === "Všetky" && i === 0} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
