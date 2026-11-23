"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface GalleryLightboxProps {
  images: string[];
  projectTitle: string;
}

export function GalleryLightbox({ images, projectTitle }: GalleryLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Focus management
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Mobile swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const shouldReduceMotion = useReducedMotion();

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    // Restore focus to the thumbnail that triggered opening
    const triggerEl = triggerRefs.current[currentIndex];
    if (triggerEl) {
      setTimeout(() => triggerEl.focus(), 50);
    }
  }, [currentIndex]);

  // Keyboard navigation & scroll locking
  useEffect(() => {
    if (!isOpen) return;

    // 1. Lock background scrolling while preserving original overflow
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. Move focus into modal dialog
    closeButtonRef.current?.focus();

    // 3. Keyboard event handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
        return;
      }

      // Focus trap within the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeLightbox, goToNext, goToPrev]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      // Swiped left -> next
      goToNext();
    } else if (diff < -swipeThreshold) {
      // Swiped right -> prev
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* ── 1. Thumbnail Grid (Preserves exact layout & responsive sizes) ── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8">
        {images.map((img, i) => (
          <Reveal
            key={i}
            delay={i * 0.1}
            className={i === 0 ? "md:col-span-2" : ""}
          >
            <button
              type="button"
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              onClick={() => openLightbox(i)}
              aria-label={`View ${projectTitle} - photo ${i + 1} of ${images.length} in full screen`}
              className="group relative block w-full overflow-hidden bg-muted cursor-zoom-in focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-4"
            >
              <div
                className={`relative w-full ${
                  i === 0 ? "aspect-[16/9]" : "aspect-[4/3] md:aspect-[1/1]"
                }`}
              >
                <Image
                  src={img}
                  alt={`${projectTitle} gallery image ${i + 1}`}
                  fill
                  sizes={
                    i === 0
                      ? "100vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Subtle hover overlay indicator */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* ── 2. Full-Screen Accessible Lightbox Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${projectTitle} gallery lightbox`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.25 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-canvas backdrop-blur-md select-none"
            onClick={closeLightbox}
          >
            {/* Top Bar: Title, Counter & Close Button */}
            <header
              className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-amber font-medium">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline-block h-3 w-px bg-white/20" />
                <h3 className="hidden sm:inline-block font-sans text-xs tracking-wider uppercase text-white/70 truncate max-w-md">
                  {projectTitle}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close gallery lightbox"
                className="group flex items-center gap-2 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-amber"
              >
                <span className="text-xs uppercase tracking-widest hidden md:inline text-white/60 group-hover:text-white">
                  Close
                </span>
                <X size={22} />
              </button>
            </header>

            {/* Main Stage: Prev, Next & High-Res Image View */}
            <div
              className="relative flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Previous Image Button */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 md:left-8 z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/80 hover:text-white transition-all backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-amber"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Active Image (Clicking inside does not close dialog) */}
              <div
                className="relative max-h-[75vh] md:max-h-[82vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{
                      opacity: 0,
                      scale: shouldReduceMotion ? 1 : 0.98,
                    }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: shouldReduceMotion ? 1 : 1.02,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0.1 : 0.25,
                      ease: "easeOut",
                    }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={images[currentIndex]}
                      alt={`${projectTitle} detail ${currentIndex + 1}`}
                      fill
                      priority
                      sizes="95vw"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Image Button */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 md:right-8 z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/80 hover:text-white transition-all backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-amber"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Footer: Mobile Counter & Keyboard Hint */}
            <footer
              className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 border-t border-white/10 text-xs text-white/40"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sm:hidden font-sans text-xs uppercase tracking-wider text-white/60 truncate">
                {projectTitle}
              </span>
              <div className="hidden sm:flex items-center gap-6">
                <span>Use ← and → keys to navigate</span>
                <span>Press Esc to close</span>
              </div>
              <span className="text-white/40">Swipe supported</span>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
