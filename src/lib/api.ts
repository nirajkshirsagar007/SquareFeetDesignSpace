/**
 * api.ts — Centralised API client for the Square Feet backend
 *
 * All data-fetching calls go through here so there is one place
 * to change the base URL, headers, caching, or error handling.
 * Includes graceful fallback to static data when backend is unreachable.
 */

import type { Project } from "@/types";
import { projects as fallbackProjects } from "@/data/projects";

// ── Types that mirror the backend response shape ──────────

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ProjectFromApi extends Omit<Project, "materials" | "gallery" | "category"> {
  category: "Residential" | "Commercial" | "Hospitality" | "Institutional" | "MixedUse";
  materials: { material: string; order: number }[];
  gallery: { imageUrl: string; alt: string; order: number }[];
  timeline: { phase: string; date: string; order: number }[];
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message?: string;
}

// ── Base fetch helper ─────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${path}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}: ${await res.text()}`);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}

// ── Normaliser — backend shape → frontend type ────────────

function normaliseProject(p: ProjectFromApi): Project {
  return {
    ...p,
    materials: p.materials.map((m) => m.material),
    gallery: p.gallery.map((g) => g.imageUrl),
    timeline: p.timeline,
    category: (p.category === "MixedUse" ? "Mixed-Use" : p.category) as Project["category"],
  };
}

// ── API methods ───────────────────────────────────────────

export const api = {
  projects: {
    /** Fetch all published projects with fallback to local static data if backend is unreachable */
    getAll: async (params?: {
      category?: string;
      status?: string;
      featured?: boolean;
    }): Promise<Project[]> => {
      try {
        const qs = new URLSearchParams();
        if (params?.category) qs.set("category", params.category);
        if (params?.status) qs.set("status", params.status);
        if (params?.featured) qs.set("featured", "true");

        const query = qs.toString() ? `?${qs}` : "";

        const raw = await apiFetch<ProjectFromApi[]>(`/api/projects${query}`, {
          next: { revalidate: 60 },
        });

        return raw.map(normaliseProject);
      } catch (err) {
        console.warn("[api.projects.getAll] Backend unreachable or failed, using fallback static data.", err);
        let result = fallbackProjects;
        if (params?.category) {
          result = result.filter((p) => p.category === params.category);
        }
        if (params?.status) {
          result = result.filter((p) => p.status === params.status);
        }
        if (params?.featured) {
          result = result.filter((p) => p.featured);
        }
        return result;
      }
    },

    /** Fetch a single project by its slug with fallback */
    getBySlug: async (slug: string): Promise<Project | null> => {
      try {
        const raw = await apiFetch<ProjectFromApi>(`/api/projects/${slug}`, {
          next: { revalidate: 60 },
        });
        return normaliseProject(raw);
      } catch (err) {
        console.warn(`[api.projects.getBySlug] Backend unreachable for slug "${slug}", using fallback.`, err);
        const match = fallbackProjects.find((p) => p.slug === slug);
        return match ?? null;
      }
    },

    /** Fetch featured projects for the homepage. */
    getFeatured: async (): Promise<Project[]> => {
      return api.projects.getAll({ featured: true });
    },
  },

  inquiries: {
    /** Submit inquiry to backend API */
    submit: async (data: InquiryInput): Promise<{ id: string }> => {
      return apiFetch<{ id: string }>("/api/inquiries", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  },
};
