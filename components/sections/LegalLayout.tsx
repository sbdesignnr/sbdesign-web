import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import { site, legalLinks } from "@/lib/site";

export interface LegalSub {
  t?: string;
  d: string;
}
export interface LegalSection {
  h: string;
  p?: string[];
  list?: string[];
  sub?: LegalSub[];
}

export default function LegalLayout({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <main>
      <section className="relative gutter pt-40 pb-12 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[50vh]"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(47,107,255,0.12), transparent 70%)" }}
        />
        <div className="mx-auto max-w-[1100px]">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h1 className="font-display font-extrabold leading-[0.98] tracking-[-0.03em]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            {title}
          </h1>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-marble-muted">
            {intro ?? `Naposledy aktualizované: ${updated}`}
          </p>
        </div>
      </section>

      <section className="gutter pb-28">
        <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-12">
          {/* sticky index */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <span className="label mb-5 block">Obsah</span>
              <ol className="flex flex-col gap-2.5">
                {sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#sec-${i + 1}`} className="flex gap-2 text-sm text-marble-dim transition-colors hover:text-marble">
                      <span className="font-mono text-[11px] text-azure">{String(i + 1).padStart(2, "0")}</span>
                      <span className="leading-snug">{s.h}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* content */}
          <div className="lg:col-span-9">
            <div className="flex flex-col gap-12">
              {sections.map((s, i) => (
                <div key={s.h} id={`sec-${i + 1}`} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 font-display text-2xl font-bold tracking-tight text-marble">
                    <span className="font-mono text-sm text-azure">{String(i + 1).padStart(2, "0")}</span>
                    {s.h}
                  </h2>

                  <div className="mt-5 flex flex-col gap-4 leading-relaxed text-marble-dim">
                    {s.p?.map((para, j) => <p key={`p${j}`}>{para}</p>)}

                    {s.list && (
                      <ul className="flex flex-col gap-2.5">
                        {s.list.map((item, j) => (
                          <li key={`l${j}`} className="flex gap-3">
                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-azure" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.sub && (
                      <div className="mt-1 flex flex-col gap-5">
                        {s.sub.map((sub, j) => (
                          <div key={`s${j}`} className="rounded-xl border border-line bg-ink-800/30 p-5">
                            {sub.t && <p className="mb-1.5 font-display font-semibold text-marble">{sub.t}</p>}
                            <p className="text-[15px] leading-relaxed text-marble-dim">{sub.d}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* footer note */}
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-marble-muted">
                  Naposledy aktualizované: {updated}
                </span>
                <span className="hidden h-3 w-px bg-line-strong sm:block" />
                {legalLinks
                  .filter((l) => l.label.toLowerCase() !== title.toLowerCase())
                  .map((l) => (
                    <Link key={l.href} href={l.href} className="link-underline font-mono text-[11px] uppercase tracking-[0.12em] text-marble-dim transition-colors hover:text-marble">
                      {l.label}
                    </Link>
                  ))}
                <a href={`mailto:${site.email}`} className="ml-auto text-sm text-marble-dim transition-colors hover:text-azure">
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
