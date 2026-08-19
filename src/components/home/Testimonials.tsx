"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const reduced = shouldReduceMotion ?? false;

  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((i) => (i + 1) % testimonials.length);

  if (!testimonials.length) return null;

  const current = testimonials[active];

  return (
    <section
      className="section-py border-t border-border"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p">08 — Client Perspective</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="testimonials-heading"
                className="mt-3 font-display text-3xl text-ink sm:text-4xl"
              >
                In their words.
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-9 lg:col-span-8 lg:col-start-4">
            <Reveal delay={0.15}>
              <div className="relative min-h-[220px] md:min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={active}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? {} : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    cite={current.project}
                  >
                    <p className="font-display text-2xl leading-snug text-ink sm:text-3xl lg:text-4xl">
                      &ldquo;{current.quote}&rdquo;
                    </p>
                    <footer className="mt-8">
                      <cite className="not-italic">
                        <p className="font-sans text-sm text-ink">
                          {current.author}
                        </p>
                        <p className="mt-1 font-sans text-2xs tracking-[0.18em] uppercase text-stone">
                          {current.role}&ensp;—&ensp;{current.project}
                        </p>
                      </cite>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {testimonials.length > 1 && (
                <div className="mt-10 flex items-center gap-4">
                  <button
                    onClick={prev}
                    className="flex h-10 w-10 items-center justify-center border border-border text-stone transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-amber"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={16} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                  <span className="font-sans text-2xs tracking-widest uppercase text-stone">
                    {String(active + 1).padStart(2, "0")}&ensp;/&ensp;
                    {String(testimonials.length).padStart(2, "0")}
                  </span>
                  <button
                    onClick={next}
                    className="flex h-10 w-10 items-center justify-center border border-border text-stone transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-amber"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
