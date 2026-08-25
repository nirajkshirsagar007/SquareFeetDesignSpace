import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export function AboutProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 2);

  if (!featured.length) return null;

  return (
    <section className="section-py border-t border-border" aria-labelledby="about-projects-heading">
      <div className="container-site">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionLabel as="p">Selected Work</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="about-projects-heading"
                className="mt-3 font-display text-3xl text-ink sm:text-4xl lg:text-5xl"
              >
                Built with intention.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link
              href="/projects"
              className="group hidden shrink-0 items-center gap-2 font-sans text-2xs tracking-[0.18em] uppercase text-stone transition-colors hover:text-amber focus-visible:outline-amber md:inline-flex"
            >
              All Projects
              <ArrowRight
                size={13}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-y-14 md:grid-cols-2 md:gap-x-8 md:gap-y-0 md:mt-16">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.12}>
              <ProjectCard
                project={project}
                index={i}
                aspectClass="aspect-[4/3]"
                priority={false}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 md:hidden">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-sans text-2xs tracking-[0.18em] uppercase text-ink transition-colors hover:border-amber hover:text-amber focus-visible:outline-amber"
            >
              View All Projects
              <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}