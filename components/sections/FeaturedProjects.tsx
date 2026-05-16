"use client";

import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    name: "Propsyche",
    src: "/propsyche.png",
    category: "Psychologická ambulancia",
  },
  {
    name: "Starea",
    src: "/starea.png",
    category: "Realitná kancelária",
  },
  {
    name: "Fyzioterapia pre každého",
    src: "/fyzio.png",
    category: "Moderná fyzioterapia",
  },
  {
    name: "Zaar Trnava",
    src: "/zaar.png",
    category: "Prémiová reštaurácia",
  },
  {
    name: "Ľubica Bibenová",
    src: "/lubica.png",
    category: "Osobný brand",
  },
];

export default function FeaturedProjects() {
  return (
    <section
      id="portfolio"
      className="relative pb-[10vh]"
      aria-label="Najnovšie projekty – SBDESIGN"
    >
      {/* Section heading */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span className="font-inter text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-blue-400">
            Portfólio
          </span>
        </div>

        <h2
          className="font-syne text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            textShadow:
              "0 0 60px rgba(0,102,255,0.5), 0 0 120px rgba(0,102,255,0.22)",
          }}
        >
          Moje najnovšie práce
        </h2>

        <p className="font-inter mx-auto mt-5 max-w-sm text-sm leading-relaxed text-gray-500 md:max-w-md md:text-base">
          Toto je len výber —{" "}
          <span className="text-gray-400">
            zvyšok nájdeš v celom portfóliu.
          </span>
        </p>
      </div>

      {/* Sticky stacking cards container */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {PROJECTS.map((project, index) => (
          <div
            key={project.name}
            className="group sticky h-[60vh] w-full origin-top overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:h-[80vh]"
            style={{
              top: `calc(10vh + ${index * 20}px)`,
              zIndex: index + 1,
            }}
          >
            {/* Project image — scale on group hover */}
            <img
              src={project.src}
              alt={project.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark gradient overlay from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/60 to-transparent" />

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-6 sm:p-8 md:p-10">
              <div>
                <p className="font-inter mb-2 text-xs uppercase tracking-[0.22em] text-blue-400 md:text-sm">
                  {project.category}
                </p>
                <h3 className="font-syne text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  {project.name}
                </h3>
              </div>

              {/* CTA button */}
              <button
                type="button"
                className="group/btn ml-4 flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-xs font-medium text-white backdrop-blur-xl transition-all duration-500 hover:gap-3 hover:border-blue-500 hover:bg-blue-600 md:px-6 md:py-4 md:text-sm"
              >
                <span className="hidden whitespace-nowrap sm:inline">
                  Zobraziť detail
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
