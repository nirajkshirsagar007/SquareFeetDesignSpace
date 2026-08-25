import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Intro() {
  return (
    <section
      className="section-py"
      aria-labelledby="intro-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">

          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p">01 — Introduction</SectionLabel>
            </Reveal>
          </div>

          <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
            <Reveal delay={0.1}>
              <h2
                id="intro-heading"
                className="font-display text-3xl leading-snug text-ink sm:text-4xl lg:text-5xl"
              >
                We design and build spaces
                <br className="hidden md:block" /> where architecture, engineering
                <br className="hidden md:block" /> and human experience meet.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                <p className="font-sans text-sm leading-relaxed text-stone">
                  SquareFeet Design Space brings architecture, engineering and
                  construction together under one disciplined practice — creating
                  spaces that are spatially considered, technically precise and
                  built to endure.
                </p>
                <p className="font-sans text-sm leading-relaxed text-stone">
                  From the first concept sketch to the final handover, we work
                  closely with our clients to ensure the process is as considered
                  as the result.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
