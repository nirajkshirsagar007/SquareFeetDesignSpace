import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectCTA() {
  return (
    <section className="section-py bg-ink text-canvas mt-20">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <h2 className="font-display text-4xl leading-tight text-canvas md:text-5xl lg:text-6xl">
                Have a project
                <br /> in mind?
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col items-start gap-8 md:items-end md:pb-2">
            <Reveal delay={0.1}>
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
          </div>
        </div>
      </div>
    </section>
  );
}
