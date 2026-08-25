"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { siteImages } from "@/data/site";

const headingLines = ["Spaces designed", "with intention."];

export function ServicesHero() {
  const shouldReduceMotion = useReducedMotion();
  const reduced = shouldReduceMotion ?? false;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.12,
        delayChildren: reduced ? 0 : 0.3,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: "105%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: "easeOut" },
    },
  };

  const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative flex min-h-dvh flex-col"
      aria-labelledby="services-hero-heading"
    >
      <Image
        src={siteImages.services.src}
        alt={siteImages.services.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.40) 50%, rgba(17,17,17,0.15) 100%)",
        }}
      />

      <div className="relative flex flex-1 flex-col justify-end">
        <div className="container-site pb-16 pt-nav md:pb-24 lg:pb-28">
          <motion.div
            variants={fadeVariants}
            initial={reduced ? false : "hidden"}
            animate="visible"
            className="mb-8"
          >
            <span className="font-sans text-2xs tracking-[0.2em] uppercase text-canvas/60">
              Architecture &amp; Construction
            </span>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial={reduced ? false : "hidden"}
            animate="visible"
          >
            {headingLines.map((line) => (
              <div key={line} className="overflow-hidden leading-none">
                <motion.h1
                  id={line === headingLines[0] ? "services-hero-heading" : undefined}
                  className="block font-display text-[3rem] leading-none text-canvas sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]"
                  variants={lineVariants}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </motion.div>

          <motion.p
            className="mt-8 max-w-sm font-sans text-sm leading-relaxed text-canvas/55"
            variants={fadeVariants}
            initial={reduced ? false : "hidden"}
            animate="visible"
            transition={{ delay: reduced ? 0 : 0.9, duration: 0.7 }}
          >
            We bring architecture, interiors, and execution together &mdash; considered from every angle, built to endure.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
