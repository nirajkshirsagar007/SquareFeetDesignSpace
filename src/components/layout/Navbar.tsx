"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navScrolled = scrolled || !isHome;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-navbar transition-all duration-500",
          navScrolled
            ? "bg-canvas/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
        initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container-site flex h-16 items-center justify-between md:h-20">
          <Wordmark inverted={!navScrolled} />

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2",
                  navScrolled
                    ? "text-ink hover:text-amber"
                    : "text-canvas hover:text-canvas/70",
                  pathname === link.href &&
                    "text-amber after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-amber"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className={cn(
              "flex h-10 w-10 items-center justify-center transition-colors lg:hidden",
              navScrolled ? "text-ink hover:text-amber" : "text-canvas"
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
