import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const clientPlaceholders = [
  "Client A",
  "Client B",
  "Client C",
  "Client D",
  "Client E",
  "Client F",
];

export function Clients() {
  return (
    <section
      className="section-py border-t border-border"
      aria-labelledby="clients-heading"
    >
      <div className="container-site">
        <Reveal>
          <SectionLabel as="p">09 — Collaboration</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="clients-heading"
            className="mt-3 font-display text-3xl text-ink sm:text-4xl"
          >
            Trusted by.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <ul
            className="mt-12 grid grid-cols-2 divide-x divide-y divide-border border border-border sm:grid-cols-3 lg:grid-cols-6"
            aria-label="Client list (placeholder)"
            role="list"
          >
            {clientPlaceholders.map((name) => (
              <li
                key={name}
                className="flex items-center justify-center px-6 py-8"
              >
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-stone">
                  {name}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-sans text-2xs text-stone/60">
            Placeholder — replace with real client names or logos when available.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
