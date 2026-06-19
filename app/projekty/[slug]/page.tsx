import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjectSlugs } from "@/lib/projects";
import CaseStudyView from "@/components/sections/CaseStudyView";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projekt nenájdený" };
  return {
    title: `${project.title} — Case study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — SB Design`,
      description: project.summary,
      images: [{ url: project.image }],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = project.next ? getProject(project.next) : undefined;
  return <CaseStudyView project={project} next={next} />;
}
