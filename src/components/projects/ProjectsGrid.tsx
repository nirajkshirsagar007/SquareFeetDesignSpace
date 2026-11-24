"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, X, RotateCcw } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project, ProjectCategory } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

const CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Residential",
  "Commercial",
  "Hospitality",
  "Institutional",
  "Mixed-Use",
];

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  // Dynamic category counts based on the complete projects collection
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: projects.length,
    };
    for (const cat of CATEGORIES) {
      if (cat !== "All") {
        counts[cat] = projects.filter((p) => p.category === cat).length;
      }
    }
    return counts;
  }, [projects]);

  // Combined real-time filter: Category + Search Query
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      // 1. Category filter
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      if (!matchesCategory) return false;

      // 2. Search query filter
      if (!query) return true;

      const title = (project.title || "").toLowerCase();
      const city = (project.city || "").toLowerCase();
      const location = (project.location || "").toLowerCase();
      const category = (project.category || "").toLowerCase();
      const shortDesc = (project.shortDescription || "").toLowerCase();

      return (
        title.includes(query) ||
        city.includes(query) ||
        location.includes(query) ||
        category.includes(query) ||
        shortDesc.includes(query)
      );
    });
  }, [projects, activeCategory, searchQuery]);

  // Reset both search query and category filter
  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  const isFiltered = activeCategory !== "All" || searchQuery.trim().length > 0;

  return (
    <div className="flex flex-col gap-10 md:gap-16">
      {/* ── Filter & Search Control Panel ── */}
      <div className="flex flex-col gap-6 border-b border-border pb-8">
        {/* Top Row: Search Bar & Live Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div
            role="search"
            aria-label="Filter projects by title, location, or typology"
            className="relative w-full sm:max-w-md"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, city, typology..."
              aria-label="Search architectural projects by name, location, or typology"
              className="w-full px-4 pr-9 py-2.5 bg-canvas border border-border text-sm text-ink placeholder:text-stone/60 outline-none transition-colors duration-200 focus:border-amber focus:ring-1 focus:ring-amber/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone hover:text-ink transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Results Counter & Reset Link */}
          <div className="flex items-center gap-4 text-xs font-sans tracking-[0.1em] uppercase text-stone">
            <span aria-live="polite">
              Showing {filteredProjects.length} of {projects.length}{" "}
              {projects.length === 1 ? "work" : "works"}
            </span>
            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-amber hover:underline transition-colors"
              >
                <RotateCcw size={12} aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Horizontally Scrollable Category Filters */}
        <nav aria-label="Project categories" className="w-full overflow-hidden">
          <ul className="flex items-center gap-x-6 sm:gap-x-8 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => {
              const count = categoryCounts[category] ?? 0;
              const isSelected = activeCategory === category;

              return (
                <li key={category} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`group inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2 ${
                      isSelected
                        ? "text-amber font-medium"
                        : "text-stone hover:text-ink"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-2xs transition-colors duration-200 ${
                        isSelected
                          ? "text-amber/80 font-normal"
                          : "text-stone/60 group-hover:text-ink/60"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* ── Project Cards Grid with Framer Motion ── */}
      <motion.div
        layout={!shouldReduceMotion}
        className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-y-20 min-h-[300px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              className="relative z-0"
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
              }
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <ProjectCard
                project={project}
                aspectClass="aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5]"
                priority={i < 4}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ── Architectural Empty State ── */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="col-span-full py-20 px-6 border border-dashed border-border bg-muted/20 text-center flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-stone">
              <Search size={20} strokeWidth={1.5} />
            </div>

            <div className="max-w-md space-y-1.5">
              <h3 className="font-display text-xl text-ink">
                No architectural works found
              </h3>
              <p className="font-sans text-sm text-stone leading-relaxed">
                {searchQuery ? (
                  <>
                    No projects match &ldquo;<span className="text-ink font-medium">{searchQuery}</span>&rdquo;
                    {activeCategory !== "All" && (
                      <> in <span className="text-ink font-medium">{activeCategory}</span></>
                    )}
                    . Try adjusting your query or resetting filters.
                  </>
                ) : (
                  <>
                    No projects currently available under{" "}
                    <span className="text-ink font-medium">{activeCategory}</span>.
                  </>
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 border border-border bg-canvas text-xs font-sans tracking-[0.1em] uppercase text-ink hover:border-amber hover:text-amber transition-colors"
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span>Reset All Filters</span>
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
