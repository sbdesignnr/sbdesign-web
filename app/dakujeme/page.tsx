"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

// `Window.dataLayer` je už globálne deklarovaný cez @next/third-parties.

const EASE = [0.16, 1, 0.3, 1] as const;

export default function DakujemePage() {
  useEffect(() => {
    // GTM konverzia — odoslanie kontaktného formulára
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_submission", event_category: "contact" });
  }, []);

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center gutter py-32 text-center">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[60vh]"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(47,107,255,0.16), transparent 72%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto max-w-2xl"
      >
        {/* success check */}
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full shadow-[0_18px_50px_-18px_rgba(47,107,255,0.7)]"
          style={{ background: "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 55%, var(--color-cyan))" }}
        >
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>

        <h1 className="mt-9 display-md">
          Ďakujeme za <span className="text-gradient">správu!</span>
        </h1>
        <p className="lead mx-auto mt-6 max-w-md">Ozvem sa vám do 24 hodín.</p>

        <div className="mt-10 flex justify-center">
          <Button href="/" size="lg" cursorLabel="Domov">
            Späť na úvodnú stránku
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
