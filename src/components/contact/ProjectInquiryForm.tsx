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
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Name is required.";
    if (!formData.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!formData.projectType) next.projectType = "Please select a project type.";
    if (!formData.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  const inputClass =
    "w-full rounded-none border border-canvas/20 bg-canvas/10 px-4 py-3 font-sans text-base text-canvas placeholder:text-canvas/40 transition-colors focus:border-amber focus:bg-canvas/15 focus:outline-none disabled:opacity-50";

  const labelClass = "font-sans text-2xs tracking-[0.12em] uppercase text-canvas/60";

  return (
    <section className="section-py border-t border-canvas/10 bg-ink" aria-labelledby="inquiry-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p" className="text-canvas/40">Inquiry</SectionLabel>
            </Reveal>
          </div>

          <div className="md:col-span-9 lg:col-span-7 lg:col-start-4">
            <Reveal delay={0.1}>
              <h2
                id="inquiry-heading"
                className="font-display text-3xl leading-tight text-canvas sm:text-4xl lg:text-5xl"
              >
                Tell us about your project.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-canvas/50">
                Share what you have in mind and we will get back to you within two working days.
              </p>
            </Reveal>

            {status === "success" ? (
              <Reveal delay={0.1}>
                <div className="mt-12 border border-canvas/20 p-8 md:p-12" role="status">
                  <h3 className="font-display text-2xl text-canvas">Thank you for your interest.</h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-canvas/60">
                    We have received your project inquiry. A member of our studio will review your details and be in touch shortly.
                  </p>
                  <div className="mt-8 border-t border-canvas/10 pt-6">
                    <p className="font-sans text-xs text-canvas/30">
                      Note: This is a frontend simulation. No actual email was sent during this phase.
                    </p>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.2}>
                <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-7" noValidate>
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className={labelClass}>Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={inputClass}
                        placeholder="Jane Doe"
                        disabled={status === "submitting"}
                      />
                      {errors.name && (
                        <span id="name-error" role="alert" className="font-sans text-xs text-amber/80">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className={labelClass}>Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={inputClass}
                        placeholder="jane@example.com"
                        disabled={status === "submitting"}
                      />
                      {errors.email && (
                        <span id="email-error" role="alert" className="font-sans text-xs text-amber/80">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="projectType" className={labelClass}>Project Type *</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      aria-invalid={!!errors.projectType}
                      aria-describedby={errors.projectType ? "projectType-error" : undefined}
                      className={inputClass}
                      disabled={status === "submitting"}
                    >
                      <option value="" disabled className="bg-ink text-canvas/60">Select a category</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-ink text-canvas">
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <span id="projectType-error" role="alert" className="font-sans text-xs text-amber/80">
                        {errors.projectType}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className={labelClass}>Project Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`${inputClass} resize-y`}
                      placeholder="Tell us about your vision, timeline, and any specific requirements..."
                      disabled={status === "submitting"}
                    />
                    {errors.message && (
                      <span id="message-error" role="alert" className="font-sans text-xs text-amber/80">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex min-h-[52px] items-center justify-center gap-3 border border-canvas/30 bg-canvas px-10 py-4 font-sans text-2xs tracking-[0.18em] uppercase text-ink transition-all duration-300 hover:border-canvas hover:bg-amber hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:pointer-events-none disabled:opacity-50"
                    >
                      {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}