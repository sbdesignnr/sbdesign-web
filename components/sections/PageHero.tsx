"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageHero({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <section className="relative gutter pt-40 pb-16 md:pt-48 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[60vh]"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(47,107,255,0.16), transparent 70%)" }}
      />
      <div className={`mx-auto max-w-[1400px] ${align === "center" ? "text-center" : ""}`}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="display-lg mt-7"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className={`lead mt-8 max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
