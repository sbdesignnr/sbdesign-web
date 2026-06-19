import type { Metadata } from "next";
import { sortedPosts } from "@/lib/blog";
import BlogHero from "@/components/sections/BlogHero";
import BlogList from "@/components/sections/BlogList";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktické články o weboch, dizajne a online marketingu. Tipy a poznatky, ktoré firmám pomáhajú získať viac zákazníkov — SB Design, Nitra.",
};

export default function BlogPage() {
  const posts = sortedPosts();
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
