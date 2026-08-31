import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCTA } from "@/components/projects/ProjectCTA";

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
    title: `${project.title} | Square Feet Architect`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) notFound();

  // Find related projects (same category, exclude current, max 2)
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 2);
    
  // If not enough in same category, just take other projects
  if (relatedProjects.length < 2) {
      const more = projects.filter(p => p.slug !== project.slug && !relatedProjects.find(rp => rp.slug === p.slug));
      relatedProjects.push(...more.slice(0, 2 - relatedProjects.length));
  }

  return (
    <div className="bg-canvas">
      {/* 1. Hero */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] w-full pt-nav">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0) 50%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-24">
          <div className="container-site">
            <Reveal>
              <h1 className="font-display text-4xl text-canvas sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 font-sans text-xs tracking-widest uppercase text-canvas/70 md:mt-6 md:text-sm">
                {project.location}&ensp;/&ensp;{project.year}&ensp;/&ensp;{project.category}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Project Information & Concept */}
      <section className="section-py border-b border-border">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            
            <div className="lg:col-span-3">
              <Reveal>
                <dl className="flex flex-col gap-6 border-l border-border pl-6">
                  <div>
                    <dt className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Client / Status</dt>
                    <dd className="mt-1 font-sans text-sm text-ink">{project.status}</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Typology</dt>
                    <dd className="mt-1 font-sans text-sm text-ink">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Location</dt>
                    <dd className="mt-1 font-sans text-sm text-ink">{project.city}</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Area</dt>
                    <dd className="mt-1 font-sans text-sm text-ink">{project.area}</dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <Reveal delay={0.1}>
                <h2 className="font-display text-3xl text-ink md:text-4xl">The Concept</h2>
                <div className="mt-6 flex flex-col gap-6">
                  <p className="font-sans text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed">
                    {project.description}
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-stone md:text-base md:leading-relaxed">
                    {project.concept}
                  </p>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Materials & Gallery */}
      <section className="section-py">
        <div className="container-site">
          
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <h3 className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Material Palette</h3>
                <ul className="mt-6 flex flex-col gap-3">
                  {project.materials.map((material, i) => (
                    <li key={i} className="flex items-center gap-3 font-sans text-sm text-ink">
                      <span className="block h-px w-5 shrink-0 bg-amber" aria-hidden="true" />
                      {material}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            
            {/* Project Timeline if it exists */}
            {project.timeline && project.timeline.length > 0 && (
              <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
                <Reveal delay={0.1}>
                  <h3 className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Timeline</h3>
                  <div className="mt-6 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-4 border-t border-border pt-6">
                    {project.timeline.map((event, i) => (
                      <div key={i} className="relative">
                        <span className="font-display text-lg text-ink block">{event.date}</span>
                        <span className="mt-1 font-sans text-xs tracking-wide text-stone block">{event.phase}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8">
            {project.gallery.map((img, i) => (
              <Reveal key={i} delay={i * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
                <div className={`relative w-full overflow-hidden bg-muted ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3] md:aspect-[1/1]"}`}>
                  <Image
                    src={img}
                    alt={`${project.title} gallery image ${i + 1}`}
                    fill
                    sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          
        </div>
      </section>

      {/* 4. Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-py border-t border-border bg-ink text-canvas">
          <div className="container-site">
            <Reveal>
              <h2 className="font-display text-3xl text-canvas md:text-4xl">Related Projects</h2>
            </Reveal>
            
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-y-0">
              {relatedProjects.map((rp, i) => (
                <Reveal key={rp.id} delay={i * 0.1}>
                   <Link
                      href={`/projects/${rp.slug}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden bg-muted aspect-[4/3] md:aspect-[3/4]">
                        <Image
                          src={rp.coverImage}
                          alt={rp.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      </div>

                      <div className="mt-5 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-display text-xl leading-snug text-canvas">
                            {rp.title}
                          </h3>
                          <p className="mt-1 font-sans text-sm text-canvas/60">
                            {rp.city}&ensp;—&ensp;{rp.category}
                          </p>
                        </div>
                        <ArrowRight
                          size={18}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-canvas/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber"
                        />
                      </div>
                    </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProjectCTA />
    </div>
  );
}
