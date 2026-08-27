import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function ServiceDetail() {
  return (
    <div className="border-t border-border">
      {services.map((service, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={service.id}
            id={`service-${service.slug}`}
            className="section-py border-b border-border scroll-mt-20"
            aria-labelledby={`service-heading-${service.id}`}
          >
            <div className="container-site">
              <div
                className={[
                  "grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center",
                  isEven ? "" : "lg:[&>*:first-child]:order-2",
                ].join(" ")}
              >
                <div>
                  <Reveal>
                    <span className="font-sans text-2xs tracking-[0.2em] uppercase text-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2
                      id={`service-heading-${service.id}`}
                      className="mt-3 font-display text-3xl text-ink sm:text-4xl lg:text-5xl"
                    >
                      {service.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <p className="mt-6 font-sans text-sm leading-relaxed text-stone">
                      {service.description}
                    </p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <ul
                      className="mt-8 flex flex-col gap-2.5"
                      aria-label={`${service.title} deliverables`}
                      role="list"
                    >
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 font-sans text-sm text-stone"
                        >
                          <span
                            className="block h-px w-5 shrink-0 bg-amber"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                <Reveal delay={0.12}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-[3/4]">
                    <Image
                      src={service.image}
                      alt={`${service.title} — SquareFeet Design Space`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
