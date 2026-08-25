import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/data/projects";

export function CaseStudy() {
  const project = projects.find((p) => p.featured);
  if (!project) return null;

  return (
    <section
      className="section-py border-t border-border"
      aria-labelledby="casestudy-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p">06 — Featured Case Study</SectionLabel>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted md:aspect-[21/9]">
          <Image
            src={project.coverImage}
            alt={`${project.title} — ${project.category} in ${project.city}`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(17,17,17,0.65) 0%, rgba(17,17,17,0.0) 60%)",
            }}
          />
        </div>
      </Reveal>

      <div className="container-site mt-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-8 lg:col-span-7">
            <Reveal>
              <h2
                id="casestudy-heading"
                className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl"
              >
                {project.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-2 font-sans text-sm tracking-widest uppercase text-stone">
                {project.category}&ensp;/&ensp;{project.city}&ensp;/&ensp;
                {project.year}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-lg font-sans text-sm leading-relaxed text-stone">
                {project.shortDescription}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href={`/projects/${project.slug}`}
                className="group mt-8 inline-flex items-center gap-3 border-b border-ink pb-1 font-sans text-2xs tracking-[0.18em] uppercase text-ink transition-all duration-300 hover:border-amber hover:text-amber focus-visible:outline-amber"
              >
                View Case Study
                <ArrowRight
                  size={13}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <aside className="md:col-span-4 lg:col-span-3 lg:col-start-10">
            <Reveal delay={0.25}>
              <dl className="flex flex-col gap-5 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                {[
                  { label: "Area", value: project.area },
                  { label: "Year", value: String(project.year) },
                  { label: "Category", value: project.category },
                  { label: "Status", value: project.status },
                  { label: "Location", value: project.city },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">
                      {label}
                    </dt>
                    <dd className="mt-1 font-sans text-sm text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
