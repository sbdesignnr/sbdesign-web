"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ────────────────────────────────────────────────────────────────────────────
//  Zdieľanie článku — Electric Ink (ink pozadie, azure akcenty).
//  Kopírovať odkaz · Facebook · LinkedIn.
// ────────────────────────────────────────────────────────────────────────────

const btn =
  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors";

export default function BlogShare({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback pre staršie / nezabezpečené kontexty.
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ticho – zlyhanie schránky neprerušuje zážitok */
    }
  }

  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line-strong bg-ink-900/50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-azure shadow-[0_0_10px_2px_rgba(47,107,255,0.7)]" />
        <span className="label">Zdieľať článok</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={copyLink}
          aria-live="polite"
          className={`${btn} ${copied ? "border-azure/70 text-azure" : "border-line-strong text-marble-dim hover:border-azure/60 hover:text-marble"}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2"
              >
                <CheckIcon />
                Odkaz skopírovaný!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2"
              >
                <LinkIcon />
                Kopírovať odkaz
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <a
          href={fb}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Zdieľať na Facebooku"
          className={`${btn} border-line-strong text-marble-dim hover:border-azure/60 hover:text-marble`}
        >
          <FacebookIcon />
          Facebook
        </a>

        <a
          href={li}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Zdieľať na LinkedIne"
          className={`${btn} border-line-strong text-marble-dim hover:border-azure/60 hover:text-marble`}
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      </div>
    </div>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.71 1.71" />
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
