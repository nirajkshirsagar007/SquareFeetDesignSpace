import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Philosophy() {
  return (
    <section className="section-py border-t border-border" aria-labelledby="philosophy-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-[3/4]">
              <Image
                src={siteImages.philosophy.src}
                alt={siteImages.philosophy.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionLabel as="p">Philosophy</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="philosophy-heading"
                className="mt-3 font-display text-3xl text-ink sm:text-4xl lg:text-5xl"
              >
                Rooted in context, shaped by light.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 font-sans text-sm leading-relaxed text-stone">
                Our philosophy centers on the belief that buildings should respond intelligently to their environment and the people who inhabit them. We do not impose a predetermined style; instead, we let the context, climate, and client dictate the architectural form. 
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 font-sans text-sm leading-relaxed text-stone">
                We favor natural light, material honesty, and spatial efficiency. Whether designing a compact urban residence or a sprawling commercial facility, we strip away the superfluous, leaving only what is essential, durable, and beautiful.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}