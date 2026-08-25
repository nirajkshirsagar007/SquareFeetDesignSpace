import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/data/site";
import { contactInfo } from "@/data/contact";

export function StudioLocation() {
  return (
    <section className="section-py border-t border-border" aria-labelledby="location-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-[4/3]">
              <Image
                src={siteImages.location.src}
                alt={siteImages.location.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <h2
                id="location-heading"
                className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl"
              >
                Visit the studio.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 font-sans text-sm leading-relaxed text-stone">
                Our space is designed to foster collaboration and creativity. We welcome clients to visit us to discuss their projects, view material samples, and see our process firsthand.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 border-l border-amber pl-6">
                <p className="whitespace-pre-line font-display text-xl leading-tight text-ink">
                  {contactInfo.address}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}