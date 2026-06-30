// ════════════════════════════════════════════════════════════════════════════
//  Blog data source. Pulls published articles from the SB Design dashboard
//  public API and maps them to the website's BlogPost shape. The original
//  in-code articles in lib/blog.ts are kept and MERGED in (deduped by slug,
//  API wins) so they stay live even when the API is reachable, and serve as a
//  fallback when it is not.
// ════════════════════════════════════════════════════════════════════════════

import type { BlogPost, BlogSection } from "./blog";
import { blogPosts as staticPosts, getPost as staticGetPost } from "./blog";
import { markdownToSections } from "./markdown-to-sections";

const API_BASE = process.env.DASHBOARD_API_URL || "https://ads.sbdesign.sk/api/public/blog";
const REVALIDATE = 3600;

// The dashboard currently returns camelCase (metaTitle/metaDescription/publishedAt);
// snake_case keys are accepted too for robustness.
interface ApiPost {
  title?: string;
  slug?: string;
  content?: string;
  metaTitle?: string | null;
  meta_title?: string | null;
  metaDescription?: string | null;
  meta_description?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  published_at?: string | null;
}

function pick<T>(...vals: (T | null | undefined)[]): T | undefined {
  for (const v of vals) if (v != null) return v;
  return undefined;
}

function isoDate(value?: string | null): string {
  if (!value) return "";
  return value.slice(0, 10); // yyyy-mm-dd — BlogPost.date is formatted later via formatDateSk()
}

function wordCount(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*`_~|-]/g, " ")
    .trim();
  return text ? text.split(/\s+/).length : 0;
}

function deriveExcerpt(metaDescription: string | undefined, sections: BlogSection[]): string {
  if (metaDescription && metaDescription.trim()) return metaDescription.trim();
  const firstPara = sections.find((s) => s.p && s.p.length)?.p?.[0] ?? "";
  if (firstPara.length <= 160) return firstPara;
  return `${firstPara.slice(0, 157).trimEnd()}…`;
}

// Derive illustration motif + accent from the article category.
function categoryStyle(category?: string | null): { motif: string; accent: string } {
  const c = (category ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  if (/market|reklam|\bads\b|ppc|kampan/.test(c)) return { motif: "ads", accent: "#5a8bff" };
  if (/dizajn|design|brand|logo|graf/.test(c)) return { motif: "blocks", accent: "#18d6ff" };
  // weby / vývoj / development / seo / rýchlosť / default
  return { motif: "speed", accent: "#2f6bff" };
}

function mapPost(api: ApiPost): BlogPost | null {
  const slug = api.slug?.trim();
  const title = api.title?.trim();
  if (!slug || !title) return null;

  const content = api.content ?? "";
  const sections = markdownToSections(content);
  const metaDescription = pick(api.metaDescription, api.meta_description) ?? undefined;
  const { motif, accent } = categoryStyle(api.category);

  return {
    slug,
    title,
    excerpt: deriveExcerpt(metaDescription, sections),
    category: (api.category ?? "Blog").trim() || "Blog",
    date: isoDate(pick(api.publishedAt, api.published_at)),
    readMinutes: Math.max(1, Math.round(wordCount(content) / 200)),
    accent,
    motif,
    sections,
  };
}

async function fetchListSlugs(opts?: { fresh?: boolean }): Promise<string[]> {
  try {
    const res = await fetch(
      API_BASE,
      opts?.fresh ? { cache: "no-store" } : { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    const posts: ApiPost[] = Array.isArray(data?.posts) ? data.posts : [];
    return posts.map((p) => p.slug).filter((s): s is string => typeof s === "string" && s.length > 0);
  } catch {
    return [];
  }
}

async function fetchApiPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_BASE}?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.post ? mapPost(data.post) : null;
  } catch {
    return null;
  }
}

/** All posts: API articles merged with the static seed articles (deduped by slug). */
export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = await fetchListSlugs();
  const apiPosts = (await Promise.all(slugs.map(fetchApiPost))).filter(
    (p): p is BlogPost => p !== null,
  );
  const apiSlugs = new Set(apiPosts.map((p) => p.slug));
  const merged = [...apiPosts, ...staticPosts.filter((p) => !apiSlugs.has(p.slug))];
  return merged.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Single post by slug: API first, falling back to the static seed article. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fromApi = await fetchApiPost(slug);
  if (fromApi) return fromApi;
  return staticGetPost(slug) ?? null;
}

/** Slugs for static generation: API slugs ∪ static seed slugs. */
export async function getAllSlugs(): Promise<string[]> {
  // Fresh fetch (bypass the Data Cache) so every build/deploy enumerates the
  // current set of published articles for generateStaticParams.
  const slugs = new Set(await fetchListSlugs({ fresh: true }));
  for (const p of staticPosts) slugs.add(p.slug);
  return [...slugs];
}
