"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// ────────────────────────────────────────────────────────────────────────────
//  Texty oddelené pre neskoršiu lokalizáciu. Pridanie jazyka = nový kľúč + LOCALE.
// ────────────────────────────────────────────────────────────────────────────
const STRINGS = {
  sk: {
    title: "Súkromie a cookies",
    body: "Používame cookies, aby web správne fungoval a — s vaším súhlasom — na anonymnú analytiku a marketing.",
    more: "Zásady cookies",
    acceptAll: "Prijať všetky",
    reject: "Odmietnuť nepotrebné",
    customize: "Prispôsobiť nastavenia",
    hide: "Skryť nastavenia",
    save: "Uložiť výber",
    always: "Vždy aktívne",
    cats: {
      necessary: { t: "Nevyhnutné", d: "Potrebné pre základné fungovanie webu a formulárov." },
      analytics: { t: "Analytické", d: "Anonymné meranie návštevnosti (Google Analytics)." },
      marketing: { t: "Marketingové", d: "Remarketing a cielenie reklamy (Facebook Pixel)." },
    },
  },
} as const;

const LOCALE: keyof typeof STRINGS = "sk";
const t = STRINGS[LOCALE];

const CONSENT_KEY = "sb-cookie-consent";
const CONSENT_VERSION = 1; // pri zmene zásad zvýšiť → návštevníci budú požiadaní nanovo

type Consent = {
  v: number;
  ts: string;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.v !== CONSENT_VERSION) return null; // neaktuálna verzia → znova sa opýtať
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(c: Omit<Consent, "v" | "ts" | "necessary">) {
  const full: Consent = { v: CONSENT_VERSION, ts: new Date().toISOString(), necessary: true, ...c };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("sb-consent-change", { detail: full }));
}

function Toggle({ on, onClick, disabled }: { on: boolean; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={on}
      className="relative h-6 w-11 shrink-0 rounded-full border transition-colors disabled:opacity-60"
      style={{
        borderColor: on ? "var(--color-azure)" : "var(--color-line-strong)",
        background: on ? "var(--color-azure)" : "rgba(255,255,255,0.04)",
      }}
    >
      <span
        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white transition-[left] duration-300"
        style={{ left: on ? "calc(100% - 1.25rem)" : "0.25rem" }}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      const id = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(id);
    }
  }, []);

  function decide(a: boolean, m: boolean) {
    writeConsent({ analytics: a, marketing: m });
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-md sm:left-6 sm:right-auto sm:mx-0"
          role="dialog"
          aria-label={t.title}
        >
          <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-900/95 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(47,107,255,0.6) 30%, rgba(24,214,255,0.6) 70%, transparent)" }}
            />
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-line-strong bg-ink-800/60 text-azure">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
                  <circle cx="9.5" cy="13" r="0.6" fill="currentColor" />
                  <circle cx="14" cy="15.5" r="0.6" fill="currentColor" />
                  <circle cx="15" cy="10" r="0.6" fill="currentColor" />
                </svg>
              </span>
              <h2 className="font-display text-base font-bold text-marble">{t.title}</h2>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-marble-dim">
              {t.body}{" "}
              <Link href="/cookies" className="text-marble underline decoration-line-strong underline-offset-2 transition-colors hover:text-azure">
                {t.more}
              </Link>
              .
            </p>

            <AnimatePresence initial={false}>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-marble">{t.cats.necessary.t}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-marble-muted">{t.cats.necessary.d}</p>
                      </div>
                      <span className="shrink-0 whitespace-nowrap pt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-marble-muted">
                        {t.always}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-marble">{t.cats.analytics.t}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-marble-muted">{t.cats.analytics.d}</p>
                      </div>
                      <Toggle on={analytics} onClick={() => setAnalytics((v) => !v)} />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-marble">{t.cats.marketing.t}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-marble-muted">{t.cats.marketing.d}</p>
                      </div>
                      <Toggle on={marketing} onClick={() => setMarketing((v) => !v)} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                {showSettings ? (
                  <button
                    type="button"
                    onClick={() => decide(analytics, marketing)}
                    className="col-span-2 inline-flex items-center justify-center rounded-full px-5 py-3 font-display text-sm font-semibold text-white transition-[filter] hover:brightness-110"
                    style={{ background: "linear-gradient(110deg, var(--color-azure-deep), var(--color-azure) 55%, var(--color-cyan))" }}
                  >
                    {t.save}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => decide(true, true)}
                      className="inline-flex items-center justify-center rounded-full px-5 py-3 font-display text-sm font-semibold text-white transition-[filter] hover:brightness-110"
                      style={{ background: "linear-gradient(110deg, var(--color-azure-deep), var(--color-azure) 55%, var(--color-cyan))" }}
                    >
                      {t.acceptAll}
                    </button>
                    <button
                      type="button"
                      onClick={() => decide(false, false)}
                      className="inline-flex items-center justify-center rounded-full border border-line-strong px-5 py-3 text-sm text-marble-dim transition-colors hover:border-marble-muted hover:text-marble"
                    >
                      {t.reject}
                    </button>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowSettings((v) => !v)}
                className="inline-flex items-center justify-center gap-1.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-marble-muted transition-colors hover:text-marble"
              >
                <svg
                  width="12" height="12" viewBox="0 0 16 16" fill="none"
                  className="transition-transform duration-300"
                  style={{ transform: showSettings ? "rotate(180deg)" : "none" }}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {showSettings ? t.hide : t.customize}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
