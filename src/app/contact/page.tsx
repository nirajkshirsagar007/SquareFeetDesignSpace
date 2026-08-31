import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { ProjectInquiryForm } from "@/components/contact/ProjectInquiryForm";
import { StudioLocation } from "@/components/contact/StudioLocation";

export const metadata: Metadata = {
  title: "Contact | Square Feet Architect",
  description: "Start a conversation with Square Feet Architect. Contact us to discuss your architectural or interior design project.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInformation />
      <ProjectInquiryForm />
      <StudioLocation />
    </>
  );
}