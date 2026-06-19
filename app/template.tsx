"use client";

import { motion } from "framer-motion";

/**
 * Next.js `template` re-mounts on every navigation — used here for an
 * elegant per-route enter animation (content rises + a thin wipe).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {/* Wipe overlay that retracts upward on enter */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: "linear-gradient(180deg, #06080f, #04060c)" }}
      />
    </>
  );
}
