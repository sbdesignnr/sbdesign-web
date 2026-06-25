"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const serviceOptions = ["Web na mieru", "E-shop", "Meta & Google Ads", "Kompletné riešenie", "Niečo iné"];
const budgetOptions = ["do 1 500 €", "1 500 – 3 000 €", "3 000 – 6 000 €", "6 000 € +", "Zatiaľ neviem"];

type Status = "idle" | "loading" | "error";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-marble-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-white/[0.02] px-4 py-3.5 font-body text-marble outline-none transition-colors placeholder:text-marble-faint focus:border-azure focus:bg-white/[0.04]";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState("Web na mieru");
  const [budget, setBudget] = useState(budgetOptions[1]);
  const [consent, setConsent] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      setError("Pre odoslanie prosím potvrďte súhlas so spracovaním osobných údajov.");
      return;
    }
    setStatus("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const message = `${String(fd.get("message") || "")}\n\n— Rozpočet: ${budget}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message, consent }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Nastala chyba.");
      // úspech → presmerovanie na ďakovnú stránku (GTM konverzia tam)
      router.push("/dakujeme");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Nastala chyba. Skúste znova.");
    }
  }

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-9">
      <motion.form onSubmit={onSubmit} className="flex flex-col gap-5" initial={{ opacity: 1 }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Vaše meno *">
                <input name="name" required placeholder="Ján Novák" className={inputClass} />
              </Field>
              <Field label="Email *">
                <input name="email" type="email" required placeholder="jan@firma.sk" className={inputClass} />
              </Field>
            </div>

            <Field label="O akú službu máte záujem?">
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setService(s)}
                    className="rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors"
                    style={{
                      borderColor: service === s ? "var(--color-azure)" : "var(--color-line-strong)",
                      background: service === s ? "var(--color-azure)" : "transparent",
                      color: service === s ? "#fff" : "var(--color-marble-dim)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Orientačný rozpočet">
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className="rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors"
                    style={{
                      borderColor: budget === b ? "var(--color-azure)" : "var(--color-line-strong)",
                      background: budget === b ? "var(--color-azure)" : "transparent",
                      color: budget === b ? "#fff" : "var(--color-marble-dim)",
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Popíšte váš projekt *">
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Čím sa zaoberáte, čo potrebujete, aký je cieľ a termín…"
                className={`${inputClass} resize-none`}
              />
            </Field>

            {/* GDPR / marketing consent */}
            <label className="flex cursor-pointer items-start gap-3 pt-1">
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="sr-only"
              />
              <span
                aria-hidden
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border transition-colors"
                style={{
                  borderColor: consent ? "var(--color-azure)" : "var(--color-line-strong)",
                  background: consent ? "var(--color-azure)" : "rgba(255,255,255,0.02)",
                }}
              >
                {consent && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-[13px] leading-relaxed text-marble-muted">
                Súhlasím so spracovaním mojich osobných údajov na marketingové účely v zmysle{" "}
                <a href="/ochrana-osobnych-udajov" target="_blank" className="text-marble-dim underline decoration-line-strong underline-offset-2 transition-colors hover:text-azure">
                  Ochrany osobných údajov
                </a>
                .
              </span>
            </label>

            {status === "error" && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              data-cursor-label="Odoslať"
              className="group relative mt-1 inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-display font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ background: "linear-gradient(110deg, var(--color-azure-deep), var(--color-azure) 55%, var(--color-cyan))" }}
            >
              {status === "loading" ? "Odosielam…" : "Odoslať dopyt"}
              {status !== "loading" && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
      </motion.form>
    </div>
  );
}
