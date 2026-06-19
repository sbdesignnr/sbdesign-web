import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjectSlugs } from "@/lib/projects";
import { getBlogSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const blogRoutes = getBlogSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
