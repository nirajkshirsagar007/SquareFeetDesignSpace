import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About SquareFeet Design Space — our philosophy, team, and approach.",
};

export default function AboutPage() {
  return (
    <div className="pt-nav section-py container-site">
      <p className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Coming in Phase 4</p>
      <h1 className="font-display mt-4 text-5xl text-ink">About</h1>
    </div>
  );
}
