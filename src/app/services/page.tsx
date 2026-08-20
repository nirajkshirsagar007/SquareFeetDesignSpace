import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Architecture, construction, interior design, and engineering services.",
};

export default function ServicesPage() {
  return (
    <div className="pt-nav section-py container-site">
      <p className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Coming in Phase 4</p>
      <h1 className="font-display mt-4 text-5xl text-ink">Services</h1>
    </div>
  );
}
