import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { StudioIntro } from "@/components/about/StudioIntro";
import { Philosophy } from "@/components/about/Philosophy";
import { Values } from "@/components/about/Values";
import { Process } from "@/components/home/Process";
import { Team } from "@/components/about/Team";
import { AboutProjects } from "@/components/about/AboutProjects";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "About | Square Feet Architect",
  description: "About Square Feet Architect — our philosophy, team, and integrated approach to architecture and construction.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StudioIntro />
      <Philosophy />
      <Values />
      <Process label="How We Work" />
      <Team />
      <AboutProjects />
      <CTA />
    </>
  );
}