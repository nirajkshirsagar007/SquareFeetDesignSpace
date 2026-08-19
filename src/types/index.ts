export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Hospitality"
  | "Institutional"
  | "Mixed-Use";

export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  category: ProjectCategory;
  year: number;
  status: ProjectStatus;
  area: string;
  shortDescription: string;
  description: string;
  concept: string;
  materials: string[];
  coverImage: string;
  gallery: string[];
  featured: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
}

export interface Stat {
  value: string;
  suffix: string;
  label: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
