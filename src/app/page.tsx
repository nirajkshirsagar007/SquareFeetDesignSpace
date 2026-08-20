import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Services } from "@/components/home/Services";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Stats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { CaseStudy } from "@/components/home/CaseStudy";
import { Sustainability } from "@/components/home/Sustainability";
import { Testimonials } from "@/components/home/Testimonials";
import { Clients } from "@/components/home/Clients";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "SquareFeet Design Space — Architecture & Construction",
  description:
    "We design and build spaces where architecture, engineering and human experience meet. Architecture, construction and interior design across India.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <FeaturedProjects />
      <Stats />
      <Process />
      <CaseStudy />
      <Sustainability />
      <Testimonials />
      <Clients />
      <CTA />
    </>
  );
}
