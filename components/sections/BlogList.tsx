"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type BlogPost, formatDateSk } from "@/lib/blog";
import BlogCover from "@/components/sections/BlogCover";

const EASE = [0.16, 1, 0.3, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

function Chip({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border bg-ink-950/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
      style={{ borderColor: `${accent}66`, color: accent }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
      {label}
    </span>
  );
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-marble-muted">
      <span>{formatDateSk(post.date)}</span>
      <span className="text-marble-faint">·</span>
      <span>{post.readMinutes} min čítania</span>
    </div>
  );
}

function ReadLink() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-azure">
      Čítať článok
      <span className="grid h-7 w-7 place-items-center rounded-full border border-azure/40 transition-all duration-500 group-hover:border-azure group-hover:bg-azure group-hover:text-white">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="transition-transform duration-500 group-hover:translate-x-0.5">
          <path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <motion.article variants={item}>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative grid overflow-hidden rounded-3xl border border-line bg-ink-900/50 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-azure/50 hover:shadow-[0_40px_90px_-50px_rgba(47,107,255,0.55)] lg:grid-cols-2"
      >
        <div className="relative">
          <BlogCover motif={post.motif} accent={post.accent} className="aspect-[16/10] h-full w-full lg:aspect-auto lg:min-h-[340px]" />
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <Chip label={post.category} accent={post.accent} />
            <span className="rounded-full border border-line-strong bg-ink-950/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-marble-dim">
              Najnovšie
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 p-8 md:p-11">
          <Meta post={post} />
          <h2 className="font-display text-[1.7rem] font-bold leading-[1.1] tracking-tight text-marble transition-colors duration-300 group-hover:text-white md:text-[2rem]">
            {post.title}
          </h2>
          <p className="max-w-xl leading-relaxed text-marble-dim">{post.excerpt}</p>
          <div className="pt-1">
            <ReadLink />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function Card({ post }: { post: BlogPost }) {
  return (
    <motion.article variants={item} className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-900/50 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-azure/50 hover:shadow-[0_36px_80px_-50px_rgba(47,107,255,0.5)]"
      >
        <div className="relative">
          <BlogCover motif={post.motif} accent={post.accent} className="aspect-[16/10] w-full" />
          <div className="absolute left-4 top-4">
            <Chip label={post.category} accent={post.accent} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3.5 p-6 md:p-7">
          <Meta post={post} />
          <h3 className="font-display text-xl font-bold leading-[1.18] tracking-tight text-marble transition-colors duration-300 group-hover:text-white">
            {post.title}
          </h3>
          <p className="flex-1 text-[15px] leading-relaxed text-marble-dim">{post.excerpt}</p>
          <div className="pt-1">
            <ReadLink />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [featured, ...rest] = posts;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="flex flex-col gap-7"
    >
      {featured && <FeaturedCard post={featured} />}
      {rest.length > 0 && (
        <div className="grid gap-7 sm:grid-cols-2">
          {rest.map((p) => (
            <Card key={p.slug} post={p} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
