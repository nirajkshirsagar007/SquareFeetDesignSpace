"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { siteImages } from "@/data/site";

const headingLines = ["WE BUILD", "SPACES", "THAT LAST."];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reduced = shouldReduceMotion ?? false;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.14,
        delayChildren: reduced ? 0 : 0.45,
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

  return (
    <section
      className="relative min-h-dvh overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Image
        src={siteImages.hero.src}
        alt={siteImages.hero.alt}
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
            "linear-gradient(to top, rgba(17,17,17,0.80) 0%, rgba(17,17,17,0.30) 55%, rgba(17,17,17,0.08) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container-site pb-14 md:pb-20 lg:pb-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <motion.div
                variants={containerVariants}
                initial={reduced ? false : "hidden"}
                animate="visible"
              >
                {headingLines.map((line) => (
                  <div key={line} className="overflow-hidden leading-none">
                    <motion.span
                      id={line === headingLines[0] ? "hero-heading" : undefined}
                      className="block font-display text-[3.25rem] leading-none text-canvas sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]"
                      variants={lineVariants}
                    >
                      {line}
                    </motion.span>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex flex-col gap-6 lg:items-end lg:pb-1">
              <motion.div
                className="flex flex-col gap-1.5 lg:items-end"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: reduced ? 0 : 1.1 }}
              >
                {["Architecture", "Engineering", "Construction"].map((d) => (
                  <span
                    key={d}
                    className="font-sans text-2xs tracking-[0.22em] uppercase text-canvas/55"
                  >
                    {d}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: reduced ? 0 : 1.3 }}
              >
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 border border-canvas/40 px-6 py-3 font-sans text-2xs tracking-[0.18em] uppercase text-canvas transition-all duration-300 hover:border-canvas hover:bg-canvas/10 focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
                >
                  Explore Projects
                  <ArrowRight
                    size={13}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
