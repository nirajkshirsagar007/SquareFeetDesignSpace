import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { brand } from "@/data/site";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-ink text-canvas">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-1 lg:col-span-2">
            <Wordmark />
            <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-canvas/60">
              Architecture, engineering, and construction delivered with
              precision. Built to last.
            </p>
          </div>

          <div>
            <p className="font-sans text-2xs tracking-[0.2em] uppercase text-canvas/40">
              Navigate
            </p>
            <ul className="mt-4 flex flex-col gap-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 font-sans text-sm text-canvas/70 transition-colors hover:text-amber focus-visible:outline-amber"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-2xs tracking-[0.2em] uppercase text-canvas/40">
              Get in touch
            </p>
            <address className="mt-4 flex flex-col gap-3 not-italic">
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-sans text-sm text-canvas/70 transition-colors hover:text-amber focus-visible:outline-amber"
              >
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}
                className="font-sans text-sm text-canvas/70 transition-colors hover:text-amber focus-visible:outline-amber"
              >
                {contactInfo.phone}
              </a>
              <p className="font-sans text-sm text-canvas/40">
                {contactInfo.address}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-canvas/10 pt-8 md:flex-row md:items-center">
          <p className="font-sans text-xs text-canvas/30">
            &copy; {year} {brand.name}. All rights reserved.
          </p>
          <p className="font-sans text-xs text-canvas/20 italic">
            {brand.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}