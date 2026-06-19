"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutTeaser() {
  return (
    <section className="section gutter">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-line-strong">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(165deg, #16213f 0%, #0a0f1e 60%, #06080f 100%)" }}
            />
            <div
              aria-hidden
              className="absolute -bottom-1/4 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(47,107,255,0.6), transparent 70%)" }}
            />
            <Image
              src="/Fotka-nova-2.png"
              alt="Samuel Biben — zakladateľ SB Design"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-contain object-bottom"
            />
            {/* badge */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-line-strong bg-ink-950/70 px-3.5 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-azure pulse-dot" />
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-marble">Dostupný pre projekty</span>
            </div>
          </div>
        </motion.div>

        {/* text */}
        <div className="lg:col-span-7">
          <Eyebrow className="mb-6">Za SB Design</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="display-md"
          >
            Ahoj, som <span className="text-gradient">Samuel.</span>
          </motion.h2>

          <div className="mt-8 max-w-xl space-y-5 text-marble-dim lg:text-lg lg:leading-relaxed">
            <p>
              Dizajnér a vývojár s posadnutosťou pre detail. Posledné roky pomáham firmám premieňať návštevníkov na
              zákazníkov — webmi, ktoré nielen krásne vyzerajú, ale aj reálne predávajú.
            </p>
            <p>
              Každý projekt beriem ako <span className="font-serif italic text-marble">vlastný biznis</span> — nie ako úlohu.
              Pracujem osobne, priamo s vami, bez stratených informácií v reťazi agentúry.
            </p>
          </div>

          {/* facts */}
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              { v: "20+", l: "projektov" },
              { v: "< 24h", l: "čas odozvy" },
              { v: site.address.split(",")[1]?.trim().split(" ").pop() || "Nitra", l: "pôsobím v" },
            ].map((f) => (
              <div key={f.l}>
                <div className="font-display text-xl font-extrabold text-marble">{f.v}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-marble-muted">{f.l}</div>
              </div>
            ))}
          </div>

          <Link
            href="/o-mne"
            data-cursor-label="O mne"
            className="group mt-10 inline-flex items-center gap-3 font-display text-sm font-semibold text-marble"
          >
            Viac o mojom prístupe
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:border-azure group-hover:bg-azure">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
