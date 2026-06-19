"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section gutter">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow className="mb-6">Časté otázky</Eyebrow>
            <h2 className="display-md">
              Otázky? <br />
              <span className="text-gradient">Mám odpovede.</span>
            </h2>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-semibold text-marble md:text-xl">{f.q}</span>
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong transition-colors"
                      style={{ borderColor: isOpen ? "var(--color-azure)" : undefined }}
                    >
                      <span className="relative block h-3 w-3">
                        <span className="absolute left-1/2 top-0 block h-3 w-px -translate-x-1/2 bg-marble transition-transform duration-300" style={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }} />
                        <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 bg-marble" />
                      </span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 leading-relaxed text-marble-dim">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
