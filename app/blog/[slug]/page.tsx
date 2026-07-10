import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog-api";
import { site } from "@/lib/site";
import BlogPostView from "@/components/sections/BlogPostView";

// Revalidate hourly (ISR); new slugs not generated at build render on-demand.
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Článok nenájdený" };
  const url = `${site.url}/blog/${post.slug}`;
  // OG/Twitter images come from the generated opengraph-image.tsx (branded, per post).
  return {
    // `title` je H1 článku (často 90+ znakov). Google odreže ~60, preto ide do
    // <title> kratší metaTitle z dashboardu. `absolute` zabráni tomu, aby šablóna
    // z layoutu pripojila značku druhýkrát.
    title: { absolute: post.metaTitle ?? `${post.title} — ${site.name}` },
    description: post.excerpt,
    // Per-post canonical — the primary fix so Google indexes one clean URL.
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${post.title} — SB Design`,
      description: post.excerpt,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    ...(post.imageUrl ? { image: post.imageUrl } : {}),
    author: { "@type": "Person", name: site.founder },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <BlogPostView post={post} />
    </>
  );
}
