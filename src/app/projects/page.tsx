import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCTA } from "@/components/projects/ProjectCTA";

export const metadata: Metadata = {
  title: "Selected Work | Square Feet Architect",
  description: "Explore our portfolio of residential, commercial, and mixed-use architecture projects.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-nav">
      <div className="container-site pt-16 md:pt-24">
        <header className="mb-16 md:mb-24">
          <Reveal>
            <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
              Selected <br /> Work
            </h1>
          </Reveal>
        </header>

        <Reveal delay={0.1}>
          <ProjectsGrid projects={projects} />
        </Reveal>
      </div>
      <ProjectCTA />
    </div>
  );
}
