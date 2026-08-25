import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { team } from "@/data/team";

export function Team() {
  return (
    <section className="section-py border-t border-border" aria-labelledby="team-heading">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel as="p">The Team</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="team-heading"
                className="mt-3 font-display text-3xl text-ink sm:text-4xl lg:text-5xl"
              >
                Led by experience.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-stone">
              Our studio is composed of architects, interior designers, and construction managers dedicated to the craft of building well.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-8">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.1}>
              <article className="group">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="font-display text-2xl text-ink">{member.name}</h3>
                  <p className="mt-1 font-sans text-xs tracking-wider uppercase text-amber">
                    {member.role}
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-stone">
                    {member.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}