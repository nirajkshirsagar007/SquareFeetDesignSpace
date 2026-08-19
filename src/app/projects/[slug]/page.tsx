import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="pt-32 section-py container-site">
      <p className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Coming in Phase 3</p>
      <h1 className="font-display mt-4 text-5xl text-ink">{project.title}</h1>
      <p className="mt-2 font-sans text-sm text-stone">{project.location}</p>
    </div>
  );
}
