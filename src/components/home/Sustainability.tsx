import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteImages } from "@/data/site";

const principles = [
  "Passive design and natural ventilation",
  "Considered material selection",
  "Maximised natural daylighting",
  "Long-term durability over short-term finish",
  "Responsible waste and water management",
];

export function Sustainability() {
  return (
    <section
      className="section-py border-t border-border"
      aria-labelledby="sustainability-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">

          <div className="flex flex-col justify-center">
            <Reveal>
              <SectionLabel as="p">07 — Responsible Design</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="sustainability-heading"
                className="mt-4 font-display text-3xl text-ink sm:text-4xl lg:text-5xl"
              >
                Architecture that considers
                <br className="hidden lg:block" /> what comes after.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-stone">
                Our approach considers materiality, efficiency and long-term
                performance from the earliest stages of design. We believe the
                most responsible building is one that lasts and serves its
                occupants well across decades.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul
                className="mt-8 flex flex-col gap-3"
                aria-label="Design principles"
                role="list"
              >
                {principles.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 font-sans text-sm text-stone"
                  >
                    <span
                      className="block h-px w-5 shrink-0 bg-amber"
                      aria-hidden="true"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ImageReveal
              src={siteImages.sustainability.src}
              alt={siteImages.sustainability.alt}
              fill
              className="aspect-[4/3] w-full lg:aspect-auto lg:h-full"
              imageClassName="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
