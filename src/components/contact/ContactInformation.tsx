import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contactInfo } from "@/data/contact";

export function ContactInformation() {
  return (
    <section className="section-py border-t border-border" aria-labelledby="contact-info-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2">
            <Reveal>
              <SectionLabel as="p">Direct</SectionLabel>
            </Reveal>
          </div>
          <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
            <h2 id="contact-info-heading" className="sr-only">Contact Details</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.1}>
                <div>
                  <h3 className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">
                    Enquiries
                  </h3>
                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="font-display text-xl text-ink transition-colors hover:text-amber focus-visible:outline-amber"
                    >
                      {contactInfo.email}
                    </a>
                    <a
                      href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                      className="font-display text-xl text-ink transition-colors hover:text-amber focus-visible:outline-amber"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div>
                  <h3 className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">
                    Studio
                  </h3>
                  <address className="mt-4 not-italic">
                    <p className="whitespace-pre-line font-display text-xl leading-tight text-ink">
                      {contactInfo.address}
                    </p>
                  </address>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div>
                  <h3 className="font-sans text-2xs tracking-[0.2em] uppercase text-stone">
                    Hours
                  </h3>
                  <p className="mt-4 font-display text-xl leading-tight text-ink">
                    {contactInfo.hours}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}