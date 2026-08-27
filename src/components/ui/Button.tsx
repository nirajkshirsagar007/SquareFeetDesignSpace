import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href"
  >;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas px-7 py-3.5 hover:bg-amber hover:text-ink focus-visible:outline-amber",
  ghost:
    "text-ink px-0 py-1 border-b border-ink hover:border-amber hover:text-amber focus-visible:outline-amber",
  outline:
    "border border-ink text-ink px-7 py-3.5 hover:bg-ink hover:text-canvas focus-visible:outline-amber",
};

const sizes: Record<Size, string> = {
  sm: "text-xs tracking-widest",
  md: "text-sm tracking-widest",
  lg: "text-base tracking-widest",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
