"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCategory } from "@/types";

const projectTypes: ProjectCategory[] = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Institutional",
  "Mixed-Use",
];

export function ProjectInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.projectType) newErrors.projectType = "Please select a project type.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus("success");
  };

  return (
    <section className="section-py border-t border-border bg-canvas" aria-labelledby="inquiry-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p">Inquiry</SectionLabel>
            </Reveal>
          </div>
          
          <div className="md:col-span-9 lg:col-span-6 lg:col-start-4">
            <Reveal delay={0.1}>
              <h2
                id="inquiry-heading"
                className="font-display text-3xl leading-tight text-ink sm:text-4xl"
              >
                Project Details
              </h2>
            </Reveal>

            {status === "success" ? (
              <div
                className="mt-12 border border-border bg-ink/[0.02] p-8 md:p-12"
                role="status"
              >
                <h3 className="font-display text-2xl text-ink">Thank you for your interest.</h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-stone">
                  We have received your project inquiry. A member of our studio will review your details and get back to you within two working days.
                </p>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="font-sans text-xs text-stone/60">
                    Note: This is a frontend simulation. No actual email was sent during this phase.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8" noValidate>
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-sans text-2xs tracking-[0.1em] uppercase text-ink">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="min-h-[48px] border-b border-border bg-transparent px-0 py-3 font-sans text-base text-ink placeholder:text-stone/50 focus:border-amber focus:outline-none"
                    placeholder="Jane Doe"
                    disabled={status === "submitting"}
                  />
                  {errors.name && (
                    <span id="name-error" role="alert" className="font-sans text-xs text-red-600">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-sans text-2xs tracking-[0.1em] uppercase text-ink">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="min-h-[48px] border-b border-border bg-transparent px-0 py-3 font-sans text-base text-ink placeholder:text-stone/50 focus:border-amber focus:outline-none"
                    placeholder="jane@example.com"
                    disabled={status === "submitting"}
                  />
                  {errors.email && (
                    <span id="email-error" role="alert" className="font-sans text-xs text-red-600">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="projectType" className="font-sans text-2xs tracking-[0.1em] uppercase text-ink">
                    Project Type *
                  </label>
                  <div className="relative">
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      aria-invalid={!!errors.projectType}
                      aria-describedby={errors.projectType ? "projectType-error" : undefined}
                      className="min-h-[48px] w-full appearance-none border-b border-border bg-transparent px-0 py-3 font-sans text-base text-ink focus:border-amber focus:outline-none disabled:opacity-50"
                      disabled={status === "submitting"}
                    >
                      <option value="" disabled>Select a category</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.projectType && (
                    <span id="projectType-error" role="alert" className="font-sans text-xs text-red-600">
                      {errors.projectType}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-sans text-2xs tracking-[0.1em] uppercase text-ink">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="min-h-[120px] resize-y border-b border-border bg-transparent px-0 py-3 font-sans text-base text-ink placeholder:text-stone/50 focus:border-amber focus:outline-none"
                    placeholder="Tell us about your vision, timeline, and any specific requirements..."
                    disabled={status === "submitting"}
                  />
                  {errors.message && (
                    <span id="message-error" role="alert" className="font-sans text-xs text-red-600">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex min-h-[48px] items-center justify-center bg-ink px-8 py-4 font-sans text-2xs tracking-[0.18em] uppercase text-canvas transition-all hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:pointer-events-none disabled:opacity-70"
                  >
                    {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}