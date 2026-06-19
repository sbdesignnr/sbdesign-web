import Link from "next/link";
import { type BlogPost, formatDateSk } from "@/lib/blog";
import Eyebrow from "@/components/ui/Eyebrow";
import BlogCover from "@/components/sections/BlogCover";
import CTASection from "@/components/sections/CTASection";

export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <main>
      {/* header */}
      <section className="relative gutter pt-36 pb-10 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[55vh]"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(47,107,255,0.14), transparent 72%)" }}
        />
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-marble-muted transition-colors hover:text-marble"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:-translate-x-0.5">
              <path d="M13.5 8h-10M7.5 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Všetky články
          </Link>

          <Eyebrow className="mb-5 mt-7">{post.category}</Eyebrow>
          <h1
            className="font-display font-extrabold leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.85rem)" }}
          >
            {post.title}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-marble-muted">
            <span>{formatDateSk(post.date)}</span>
            <span className="text-marble-faint">·</span>
            <span>{post.readMinutes} min čítania</span>
            <span className="text-marble-faint">·</span>
            <span>Samuel Bibeň</span>
          </div>

          <div className="group mt-10 overflow-hidden rounded-2xl border border-line">
            <BlogCover motif={post.motif} accent={post.accent} className="aspect-[16/7] w-full" />
          </div>
        </div>
      </section>

      {/* body */}
      <article className="gutter pb-24">
        <div className="mx-auto flex max-w-[760px] flex-col gap-7 text-[1.075rem] leading-[1.75] text-marble-dim">
          {post.sections.map((s, i) => (
            <div key={i} className="flex flex-col gap-4">
              {s.h && (
                <h2 className="mt-7 font-display text-2xl font-bold tracking-tight text-marble md:text-[1.7rem]">
                  {s.h}
                </h2>
              )}
              {s.p?.map((para, j) => (
                <p key={`p${j}`}>{para}</p>
              ))}
              {s.list && (
                <ul className="flex flex-col gap-3">
                  {s.list.map((it, j) => (
                    <li key={`l${j}`} className="flex gap-3.5">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-azure" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.quote && (
                <blockquote className="my-2 border-l-2 border-azure pl-6 font-serif text-[1.4rem] italic leading-snug text-marble">
                  {s.quote}
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </article>

      <CTASection
        eyebrow="Od slov k činom"
        title={
          <>
            Premeňme to na <span className="text-gradient">váš výsledok.</span>
          </>
        }
      />
    </main>
  );
}
