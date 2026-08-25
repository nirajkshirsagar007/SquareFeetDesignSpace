import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/data/services";

export function ServiceList() {
  return (
    <section className="section-py border-t border-border" aria-labelledby="services-list-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p">What We Do</SectionLabel>
            </Reveal>
          </div>

          <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
            <Reveal delay={0.1}>
              <h2
                id="services-list-heading"
                className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl"
              >
                Full-spectrum architecture
                <br className="hidden sm:block" /> and construction.
              </h2>
            </Reveal>

            <ul className="mt-12 divide-y divide-border" aria-label="Our services" role="list">
              {services.map((service, i) => (
                <Reveal key={service.id} delay={0.1 + i * 0.05}>
                  <li>
                    <Link
                      href={`#service-${service.slug}`}
                      className="group flex items-center gap-6 py-5 transition-colors duration-300 hover:bg-ink/[0.025] md:py-6"
                      aria-label={`${service.title} � scroll to service details`}
                    >
                      <span className="w-8 shrink-0 font-sans text-2xs tracking-[0.2em] text-stone transition-colors duration-300 group-hover:text-amber">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-xl text-ink sm:text-2xl">
                        {service.title}
                      </span>
                      <span className="hidden font-sans text-sm leading-relaxed text-stone sm:block sm:max-w-xs lg:max-w-sm">
                        {service.description.slice(0, 72).trimEnd()}&hellip;
                      </span>
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0 text-stone transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber"
                      />
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
