import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section
      className="section-py border-t border-border bg-ink text-canvas"
      aria-labelledby="stats-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p" className="text-canvas/40">
                04 — Experience
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="stats-heading"
                className="mt-3 font-display text-3xl text-canvas sm:text-4xl"
              >
                Numbers that matter.
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
            <Reveal delay={0.15}>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-sans text-2xs tracking-[0.2em] uppercase text-canvas/40">
                      {stat.label}
                    </dt>
                    <dd className="mt-3 font-display text-5xl leading-none text-canvas sm:text-6xl">
                      {stat.value}
                      {stat.suffix}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-12 max-w-sm font-sans text-sm leading-relaxed text-canvas/40">
                Values shown are indicative and will be updated once verified
                company data is available.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
