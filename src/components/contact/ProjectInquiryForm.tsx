"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectCategory } from "@/types";

const projectTypes: ProjectCategory[] = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Institutional",
  "Mixed-Use",
];

export function ProjectInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "74f7f50e-0299-42c7-bf1f-33cde51f4685",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
      } else {
        console.error("Web3Forms Error:", result);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("error");
    }
  };

  // Elegant filled inputs with rounded corners for better visibility
  const inputClass =
    "w-full rounded-xl border border-canvas/20 bg-canvas/5 px-5 py-4 font-sans text-base text-canvas placeholder:text-canvas/40 transition-all focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber disabled:opacity-50";

  const labelClass = "font-sans text-sm text-canvas/60";

  return (
    <section
      className="section-py border-t border-canvas/10 bg-ink text-canvas"
      aria-labelledby="inquiry-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Editorial Heading */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel as="p" className="text-canvas/60">Contact</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="inquiry-heading"
                className="mt-4 font-display text-4xl leading-tight text-canvas sm:text-5xl lg:text-6xl"
              >
                Let&rsquo;s build
                <br /> something
                <br /> together.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-canvas/60">
                Tell us about your next project and we will get back to you within two working days.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Form or Success State */}
          <div className="lg:col-span-6 lg:col-start-7 p-8 md:p-10 lg:p-12">
            {status === "success" ? (
              <Reveal delay={0.1}>
                <div className="flex flex-col justify-center lg:min-h-[400px]" role="status">
                  <h3 className="font-display text-3xl text-canvas sm:text-4xl">Thank you.</h3>
                  <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-canvas/80">
                    Your project brief has been received. We&rsquo;ll be in touch shortly to discuss the next steps.
                  </p>
                  <div className="mt-12">
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setFormData({ name: "", email: "", projectType: "", message: "" });
                      }}
                      className="group inline-flex items-center gap-3 font-sans text-xs tracking-[0.15em] uppercase text-canvas transition-colors hover:text-amber focus-visible:outline-amber"
                    >
                      Back to Contact
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.2}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                  
                  {/* 01 - NAME */}
                  <div className="relative flex flex-col gap-2">
                    <label htmlFor="name" className={labelClass}>Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={inputClass}
                      disabled={status === "submitting"}
                    />
                    {errors.name && (
                      <span id="name-error" role="alert" className="absolute -bottom-6 font-sans text-xs text-amber">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* 02 - EMAIL */}
                  <div className="relative flex flex-col gap-2">
                    <label htmlFor="email" className={labelClass}>Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={inputClass}
                      disabled={status === "submitting"}
                    />
                    {errors.email && (
                      <span id="email-error" role="alert" className="absolute -bottom-6 font-sans text-xs text-amber">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* 03 - PROJECT TYPE */}
                  <div className="relative flex flex-col gap-2">
                    <fieldset>
                      <legend className={labelClass}>Project Type</legend>
                      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {projectTypes.map((type) => (
                          <label
                            key={type}
                            className={cn(
                              "flex cursor-pointer items-center justify-center rounded-xl border px-4 py-4 text-center font-sans text-xs tracking-[0.1em] uppercase transition-all focus-within:ring-2 focus-within:ring-amber focus-within:ring-offset-2 focus-within:ring-offset-ink",
                              formData.projectType === type 
                                ? "border-amber bg-amber/10 font-semibold text-amber" 
                                : "border-canvas/20 bg-canvas/5 text-canvas/60 hover:border-canvas/40 hover:bg-canvas/10 hover:text-canvas"
                            )}
                          >
                            <input
                              type="radio"
                              name="projectType"
                              value={type}
                              checked={formData.projectType === type}
                              onChange={handleChange}
                              className="sr-only"
                              disabled={status === "submitting"}
                              aria-describedby={errors.projectType ? "projectType-error" : undefined}
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    {errors.projectType && (
                      <span id="projectType-error" role="alert" className="absolute -bottom-6 font-sans text-xs text-amber">
                        {errors.projectType}
                      </span>
                    )}
                  </div>

                  {/* 04 - MESSAGE */}
                  <div className="relative flex flex-col gap-2">
                    <label htmlFor="message" className={labelClass}>Message <span className="text-stone/50 tracking-normal">(optional)</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={cn(inputClass, "resize-y")}
                      disabled={status === "submitting"}
                    />
                    {errors.message && (
                      <span id="message-error" role="alert" className="absolute -bottom-6 font-sans text-xs text-amber">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* ERROR BANNER */}
                  {status === "error" && (
                    <div className="border border-amber/30 bg-amber/5 p-4" role="alert">
                      <p className="font-sans text-sm text-canvas">
                        Something went wrong while sending your inquiry. Please try again.
                      </p>
                    </div>
                  )}

                  {/* SUBMIT */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group flex w-full min-h-[56px] items-center justify-center gap-3 rounded-xl border border-amber bg-amber px-10 font-sans text-xs tracking-[0.15em] uppercase text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:pointer-events-none disabled:opacity-50"
                    >
                      {status === "submitting" ? "Sending..." : "Send Message"}
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
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