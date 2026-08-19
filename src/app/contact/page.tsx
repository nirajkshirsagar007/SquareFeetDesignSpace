import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with SquareFeet Design Space.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 section-py container-site">
      <p className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">Coming in Phase 4</p>
      <h1 className="font-display mt-4 text-5xl text-ink">Contact</h1>
    </div>
  );
}
