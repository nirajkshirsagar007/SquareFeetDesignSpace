import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { brand } from "@/data/site";

interface WordmarkProps {
  className?: string;
}

export function Wordmark({ className }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center focus-visible:outline-amber",
        className
      )}
      aria-label={`${brand.name} — Home`}
    >
      <Image
        src="/sfa-logo.png"
        alt={brand.name}
        width={160}
        height={40}
        style={{ width: "auto", height: "40px" }}
        className="block lg:h-[40px] h-[32px]"
        priority
      />
    </Link>
  );
}