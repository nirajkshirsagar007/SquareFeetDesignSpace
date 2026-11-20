import { cn } from "@/lib/utils";

type BadgeVariant =
  | "gold"
  | "green"
  | "yellow"
  | "red"
  | "gray"
  | "blue"
  | "charcoal";

const variants: Record<BadgeVariant, string> = {
  gold: "bg-gold/10 text-gold-dark border-gold/20",
  green: "bg-green-50 text-green-700 border-green-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  red: "bg-red-50 text-red-600 border-red-200",
  gray: "bg-charcoal/5 text-charcoal-muted border-charcoal/10",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  charcoal: "bg-charcoal text-ivory border-charcoal",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export default function Badge({
  variant = "gray",
  children,
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium border rounded-full",
        variants[variant],
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}
      {children}
    </span>
  );
}
