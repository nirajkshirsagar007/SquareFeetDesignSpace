import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section
      className="section-py border-t border-border"
      aria-labelledby="process-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p">05 — Our Process</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="process-heading"
                className="mt-3 font-display text-3xl text-ink sm:text-4xl"
              >
                How we work.
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
            <div
              className="mt-2 hidden border-t border-border pt-8 md:grid md:grid-cols-5"
              role="list"
              aria-label="Process steps"
            >
              {processSteps.map((step, i) => (
                <Reveal
                  key={step.number}
                  delay={i * 0.09}
                  className={
                    i < processSteps.length - 1
                      ? "border-r border-border pr-6"
                      : ""
                  }
                >
                  <div className={i > 0 ? "pl-6" : ""} role="listitem">
                    <span className="font-sans text-2xs tracking-[0.2em] uppercase text-amber">
                      {step.number}
                    </span>
                    <h3 className="mt-4 font-display text-xl text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-stone">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <ol
              className="mt-2 divide-y divide-border border-t border-border md:hidden"
              aria-label="Process steps"
            >
              {processSteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.08}>
                  <li className="flex gap-6 py-7">
                    <span className="shrink-0 font-sans text-2xs tracking-[0.2em] uppercase text-amber">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-stone">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
