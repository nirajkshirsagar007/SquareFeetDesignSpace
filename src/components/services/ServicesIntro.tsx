import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ServicesIntro() {
  return (
    <section className="section-py border-t border-border" aria-labelledby="approach-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p">Our Approach</SectionLabel>
            </Reveal>
          </div>

          <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
            <Reveal delay={0.1}>
              <h2
                id="approach-heading"
                className="font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl"
              >
                Architecture, interiors, and execution � considered from every angle.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Reveal delay={0.2}>
                <p className="font-sans text-sm leading-relaxed text-stone">
                  We believe the best buildings are the result of a single,
                  integrated process � not a relay race between disconnected
                  consultants. Our teams work across architecture, engineering,
                  and construction under one roof, which means decisions are
                  made earlier, problems surface faster, and the built outcome
                  is closer to the original vision.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="font-sans text-sm leading-relaxed text-stone">
                  From a family home to a multi-storey commercial building, we
                  bring the same rigour to every project: precise documentation,
                  transparent communication, and a genuine commitment to quality
                  that does not diminish at the construction stage.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
