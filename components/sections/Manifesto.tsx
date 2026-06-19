"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const EASE = [0.16, 1, 0.3, 1] as const;

// Statement split into words; `a` marks the serif-italic gradient accent.
const statement: { t: string; a?: boolean }[] = [
  { t: "Pekný" }, { t: "web" }, { t: "je" }, { t: "len" }, { t: "začiatok." },
  { t: "Ten" }, { t: "váš" }, { t: "musí" }, { t: "predávať", a: true }, { t: "—" },
  { t: "privádzať" }, { t: "dopyty," }, { t: "budovať" }, { t: "dôveru" },
  { t: "a" }, { t: "posúvať" }, { t: "vás" }, { t: "pred" }, { t: "konkurenciu." },
];

const principles = [
  { n: "01", t: "Stratégia pred dizajnom", d: "Najprv cieľ a zákazník. Dizajn je nástroj, nie ozdoba." },
  { n: "02", t: "Custom, nie šablóna", d: "Každý web na mieru. Žiadne generické témy ako tisíc ďalších." },
  { n: "03", t: "Posadnutosť detailom", d: "Detail je rozdiel medzi dobrým a prémiovým." },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const spans = textRef.current?.querySelectorAll<HTMLElement>("[data-w]");
      if (!spans?.length) return;

      gsap.set(spans, { opacity: 0.14 });
      gsap.to(spans, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: { trigger: textRef.current, start: "top 78%", end: "bottom 62%", scrub: 0.5 },
      });

      // left progress line fills with the same scroll range
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: { trigger: textRef.current, start: "top 78%", end: "bottom 62%", scrub: 0.5 },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section gutter">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* left rail */}
          <div className="lg:col-span-3">
            <Eyebrow>Prečo SB Design</Eyebrow>
            <div className="mt-6 flex gap-4">
              <span className="relative mt-1 hidden h-[68%] w-px shrink-0 bg-line lg:block">
                <span ref={lineRef} className="absolute inset-0 block bg-gradient-to-b from-azure to-cyan" />
              </span>
              <p className="max-w-xs text-sm leading-relaxed text-marble-dim">
                Web nie je výdavok. Je to váš najlepší obchodník — pracuje 24/7, nikdy neochorie a nikdy si nepýta výplatu.
              </p>
            </div>
          </div>

          {/* word-fill statement */}
          <div className="lg:col-span-9">
            <p
              ref={textRef}
              className="font-display font-bold leading-[1.12] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.7rem, 3.6vw, 3.4rem)" }}
            >
              {statement.map((w, i) => (
                <span key={i} data-w className={`inline-block ${w.a ? "font-serif italic text-gradient" : "text-marble"}`}>
                  {w.t}
                  {i < statement.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* principles */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {principles.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="group relative bg-ink-900 p-8 transition-colors duration-500 hover:bg-ink-800 md:p-10"
            >
              <span className="absolute left-0 top-0 h-0.5 w-0 bg-gradient-to-r from-azure to-cyan transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              <span className="font-mono text-xs text-azure">{p.n}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-marble md:text-2xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-marble-dim">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
