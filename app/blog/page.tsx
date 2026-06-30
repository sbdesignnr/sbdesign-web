import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-api";
import BlogHero from "@/components/sections/BlogHero";
import BlogList from "@/components/sections/BlogList";
import CTASection from "@/components/sections/CTASection";

// Revalidate hourly (ISR) so new dashboard articles appear without a rebuild.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktické články o weboch, dizajne a online marketingu. Tipy a poznatky, ktoré firmám pomáhajú získať viac zákazníkov — SB Design, Nitra.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <main>
      <BlogHero count={posts.length} />
      <section className="gutter pb-10">
        <div className="mx-auto max-w-[1200px]">
          <BlogList posts={posts} />
        </div>
      </section>
      <CTASection
        eyebrow="Máte projekt?"
        title={
          <>
            Pustíme sa do <span className="text-gradient">toho spolu?</span>
          </>
        }
      />
    </main>
  );
}
