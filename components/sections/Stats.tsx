"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/content";
import Counter from "@/components/ui/Counter";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Stats() {
  return (
    <section className="relative border-y border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(47,107,255,0.12), transparent 70%)" }}
      />
      <div className="gutter relative mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-line lg:grid-cols-4 lg:divide-y-0">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            className="flex flex-col items-start px-6 py-14 sm:px-10"
          >
            <span className="font-display text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-none tracking-[-0.04em] text-gradient">
              <Counter value={s.value} />
            </span>
            <span className="mt-4 max-w-[12rem] text-sm leading-snug text-marble-dim">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
