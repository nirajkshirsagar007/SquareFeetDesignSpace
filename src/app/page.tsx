import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SquareFeet Design Space — Architecture & Construction",
  description:
    "We design and build spaces where architecture, engineering, and human experience meet.",
};

export default function Home() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="container-site text-center">
        <p className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">
          Phase 1 Foundation
        </p>
        <h1 className="font-display mt-4 text-6xl text-ink lg:text-8xl">
          SquareFeet
          <br />
          Design Space
        </h1>
        <p className="mt-6 font-sans text-base text-stone max-w-md mx-auto">
          Architecture. Engineering. Construction.
        </p>
      </div>
    </div>
  );
}
