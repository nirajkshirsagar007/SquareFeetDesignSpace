import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const values = [
  {
    title: "Thoughtful Design",
    description: "Every decision is intentional, driven by human experience rather than aesthetic trends.",
  },
  {
    title: "Material Honesty",
    description: "We let materials speak for themselves — using concrete, timber, and steel in their true form.",
  },
  {
    title: "Functional Beauty",
    description: "Utility and elegance are not mutually exclusive; we strive for the precise intersection of both.",
  },
  {
    title: "Responsible Building",
    description: "We build for longevity, creating structures that age gracefully and respect their environment.",
  },
];

export function Values() {
  return (
    <section className="section-py border-t border-border" aria-labelledby="values-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p">Our Values</SectionLabel>
            </Reveal>
          </div>
          <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
            <h2 id="values-heading" className="sr-only">Our Core Values</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
              {values.map((value, i) => (
                <Reveal key={value.title} delay={i * 0.1}>
                  <div>
                    <span className="font-sans text-2xs tracking-[0.2em] text-stone">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">
                      {value.title}
                    </h3>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-stone">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}