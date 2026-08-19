import Link from "next/link";
import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  inverted?: boolean;
}

export function Wordmark({ className, inverted = false }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex flex-col gap-0 focus-visible:outline-amber",
        className
      )}
      aria-label="SquareFeet Design Space — Home"
    >
      <span
        className={cn(
          "font-sans text-xs tracking-[0.25em] uppercase leading-none",
          inverted ? "text-canvas" : "text-ink"
        )}
      >
        SquareFeet
      </span>
      <span
        className={cn(
          "font-sans text-2xs tracking-[0.18em] uppercase leading-none",
          inverted ? "text-canvas/60" : "text-stone"
        )}
      >
        Design Space
      </span>
    </Link>
  );
}
