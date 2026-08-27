"use client";

import { motion, AnimatePresence, useReducedMotion, type Transition } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { contactInfo } from "@/data/contact";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  const getItemTransition = (i: number): Transition => ({
    delay: shouldReduceMotion ? 0 : 0.15 + i * 0.07,
    duration: 0.4,
    ease: "easeOut",
  });

  const transition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: "easeInOut" };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm lg:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            key="menu"
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-sm flex-col bg-canvas px-8 py-10 lg:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-amber focus-visible:outline-2 focus-visible:outline-amber"
                aria-label="Close navigation menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="mt-16 flex flex-col gap-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={getItemTransition(i)}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-4 font-display text-4xl text-ink transition-colors hover:text-amber focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
                  >
                    {link.label}
                  </Link>
                  <div className="h-px bg-border" />
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto">
              <p className="font-sans text-xs tracking-widest uppercase text-stone">
                Contact
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="mt-2 block font-sans text-sm text-ink transition-colors hover:text-amber focus-visible:outline-amber"
              >
                {contactInfo.email}
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
