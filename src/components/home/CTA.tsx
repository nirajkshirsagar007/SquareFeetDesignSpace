import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contactInfo } from "@/data/contact";

export function CTA() {
  return (
    <section
      className="section-py bg-ink text-canvas"
      aria-labelledby="cta-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <SectionLabel as="p" className="text-canvas/40">
                10 — Start a Project
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="cta-heading"
                className="mt-4 font-display text-4xl leading-tight text-canvas sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Have a project
                <br /> in mind?
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col items-start gap-8 lg:items-end lg:pb-2">
            <Reveal delay={0.15}>
              <p className="max-w-sm font-sans text-sm leading-relaxed text-canvas/50 lg:text-right">
                Let&rsquo;s build something worth remembering. Tell us about
                your project and we&rsquo;ll get back to you within two working
                days.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border border-canvas/40 px-8 py-4 font-sans text-2xs tracking-[0.18em] uppercase text-canvas transition-all duration-300 hover:border-canvas hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
              >
                Start a Conversation
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>

            <Reveal delay={0.25}>
              <address className="not-italic lg:text-right">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="block font-sans text-sm text-canvas/50 transition-colors hover:text-canvas focus-visible:outline-amber"
                >
                  {contactInfo.email}
                </a>
                <a
                  href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}
                  className="mt-1 block font-sans text-sm text-canvas/50 transition-colors hover:text-canvas focus-visible:outline-amber"
                >
                  {contactInfo.phone}
                </a>
              </address>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
