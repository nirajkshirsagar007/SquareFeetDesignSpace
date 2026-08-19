import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "div";
}

export function SectionLabel({
  children,
  className,
  as: Tag = "span",
}: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        "inline-block font-sans text-2xs tracking-[0.2em] uppercase text-stone",
        className
      )}
    >
      {children}
    </Tag>
  );
}
