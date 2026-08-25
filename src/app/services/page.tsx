import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { ServiceList } from "@/components/services/ServiceList";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { Process } from "@/components/home/Process";
import { ServicesProjects } from "@/components/services/ServicesProjects";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Services | SquareFeet Design Space",
  description:
    "Architecture, interior design, construction, engineering, project management, and renovation services delivered as a single integrated practice.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesIntro />
      <ServiceList />
      <ServiceDetail />
      <Process label="How We Work" />
      <ServicesProjects />
      <CTA />
    </>
  );
}
