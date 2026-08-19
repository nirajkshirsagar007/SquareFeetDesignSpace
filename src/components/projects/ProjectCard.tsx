import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProjectCard({
  project,
  index,
  className,
  aspectClass = "aspect-[4/3]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 65vw, 50vw",
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", className)}
      aria-label={`View ${project.title} — ${project.category} project in ${project.city}`}
    >
      <div className={cn("relative overflow-hidden bg-muted", aspectClass)}>
        <Image
          src={project.coverImage}
          alt={`${project.title} — ${project.category} in ${project.city}, ${project.year}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {index !== undefined && (
            <span className="block font-sans text-2xs tracking-[0.2em] uppercase text-stone">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <h3 className="mt-1 font-display text-xl leading-snug text-ink">
            {project.title}
          </h3>
          <p className="mt-1 font-sans text-sm text-stone">
            {project.city}&ensp;—&ensp;{project.category}&ensp;—&ensp;{project.year}
          </p>
        </div>
        <ArrowUpRight
          size={18}
          strokeWidth={1.5}
          aria-hidden="true"
          className="mt-1 shrink-0 text-stone transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
        />
      </div>
    </Link>
  );
}
