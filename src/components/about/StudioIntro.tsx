import { Reveal } from "@/components/ui/Reveal";

export function StudioIntro() {
  return (
    <section className="section-py border-t border-border" aria-labelledby="studio-intro-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
            <Reveal>
              <h2
                id="studio-intro-heading"
                className="font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl"
              >
                Architecture is more than the structure of a building. It is the experience created within it.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <p className="font-sans text-sm leading-relaxed text-stone">
                  Square Feet Architect was founded on a simple premise: great design requires faultless execution. We recognized that the traditional disconnect between architects, engineers, and builders often compromises the final outcome, resulting in diluted concepts and avoidable friction.
                </p>
                <p className="font-sans text-sm leading-relaxed text-stone">
                  By bringing these disciplines under one roof, we restore control over the entire lifecycle of a project. Our approach ensures that every material choice, structural detail, and spatial sequence is considered early and executed precisely.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}