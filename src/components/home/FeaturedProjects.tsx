import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const gridLayouts = [
  {
    container: "lg:col-span-8 lg:col-start-1",
    aspect: "aspect-[4/3]",
    mt: "",
  },
  {
    container: "lg:col-span-6 lg:col-start-7",
    aspect: "aspect-[3/4]",
    mt: "lg:mt-36",
  },
  {
    container: "lg:col-span-7 lg:col-start-1",
    aspect: "aspect-[4/3]",
    mt: "lg:-mt-8",
  },
];

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  if (!featured.length) return null;

  return (
    <section
      className="section-py border-t border-border"
      aria-labelledby="projects-heading"
    >
      <div className="container-site">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionLabel as="p">03 — Selected Work</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="projects-heading"
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

        <div className="mt-14 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0 md:mt-16">
          {featured.map((project, i) => {
            const layout = gridLayouts[i] ?? gridLayouts[0];
            return (
              <Reveal
                key={project.id}
                delay={i * 0.12}
                className={[layout.container, layout.mt].join(" ")}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  aspectClass={layout.aspect}
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 55vw"
                />
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 md:hidden">
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
