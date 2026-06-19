"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BlogHero({ count }: { count: number }) {
  return (
    <section className="relative gutter pt-36 pb-10 md:pt-44 md:pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[55vh]"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(47,107,255,0.15), transparent 72%)" }}
      />
      <div className="mx-auto max-w-[1200px]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <Eyebrow className="mb-6">Blog · Poznatky</Eyebrow>
        </motion.div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="max-w-[18ch] font-display font-extrabold leading-[1.02] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.3rem)" }}
          >
            Píšem o tom, čo <span className="text-gradient">funguje.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
            className="max-w-md text-marble-dim md:text-right md:text-[15px]"
          >
            Praktické články o weboch, dizajne a marketingu — bez omáčky, rovno k veci a z reálnej praxe.
            <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-marble-muted">
              {count} {count === 1 ? "článok" : count < 5 ? "články" : "článkov"}
            </span>
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="mt-10 h-px origin-left"
          style={{ background: "linear-gradient(90deg, rgba(47,107,255,0.6), rgba(24,214,255,0.3), transparent)" }}
        />
      </div>
    </section>
  );
}
