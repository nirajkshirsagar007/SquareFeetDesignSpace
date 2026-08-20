"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

  return (
    <div className="flex flex-col gap-12 md:gap-20">
      <nav aria-label="Project categories">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={`font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2 ${
                  activeCategory === category
                    ? "text-amber"
                    : "text-stone hover:text-ink"
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div 
        layout={!shouldReduceMotion}
        className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-y-20"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              className="relative z-0"
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <ProjectCard 
                project={project} 
                aspectClass="aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5]"
                priority={i < 4}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="font-sans text-stone">No projects found in this category.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
