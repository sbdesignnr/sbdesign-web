import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjectSlugs } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog-api";

// Rebuilt hourly so newly published articles enter the sitemap without a deploy.
export const revalidate = 3600;

/**
 * NOTE: blog URLs come from `blog-api` (the dashboard API ∪ static seed articles),
 * NOT from the legacy `lib/blog` helper — that one returns an empty list, which is
 * why published articles were missing from the sitemap and Google could only find
 * them by crawling /blog.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;

  const staticRoutes = ["", "/projekty", "/sluzby", "/blog", "/kontakt"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = getProjectSlugs().map((slug) => ({
    url: `${base}/projekty/${slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const posts = await getAllPosts().catch(() => []);
  const blogRoutes = posts
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
