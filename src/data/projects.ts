import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "the-courtyard-house",
    title: "The Courtyard House",
    location: "Pune, Maharashtra",
    city: "Pune",
    category: "Residential",
    year: 2024,
    status: "Completed",
    area: "4,500 sq.ft.",
    shortDescription:
      "A contemporary residence designed around natural light, open spaces, and material honesty.",
    description:
      "The Courtyard House reimagines the traditional Indian courtyard typology for contemporary living. Every room relates to the central open-air court, ensuring cross-ventilation, natural light, and a strong connection to the outside across all seasons.",
    concept:
      "The design originated from a single spatial question: what if the void — the empty courtyard — became the house rather than the house surrounding it? All living spaces orbit this central garden, creating a sequence of thresholds between interior and exterior.",
    materials: [
      "Exposed concrete",
      "Kota stone flooring",
      "Reclaimed teak",
      "Steel profiles",
      "Handmade brick",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=85",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85",
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "meridian-offices",
    title: "Meridian Offices",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    category: "Commercial",
    year: 2024,
    status: "Completed",
    area: "18,000 sq.ft.",
    shortDescription:
      "A mid-rise commercial workspace that balances open collaboration and focused work environments.",
    description:
      "Meridian Offices was conceived as a workplace that respects both the need for focused individual work and the energy of collaborative exchange. The floor plan offers a gradient from public to private, from loud to quiet, without rigid partitions.",
    concept:
      "A continuous landscape of work — one uninterrupted floor plate with programmatic zones defined by material, light, and level changes rather than walls.",
    materials: [
      "Polished concrete floors",
      "Blackened steel",
      "White oak millwork",
      "Acoustic plaster",
      "Terrazzo details",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=85",
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "sea-cliff-villa",
    title: "Sea Cliff Villa",
    location: "Goa",
    city: "Goa",
    category: "Residential",
    year: 2025,
    status: "Ongoing",
    area: "7,200 sq.ft.",
    shortDescription:
      "A luxury villa perched above the sea, designed to dissolve the boundary between architecture and landscape.",
    description:
      "Sea Cliff Villa occupies a dramatic coastal site overlooking the Arabian Sea. The building steps down the topography, allowing each level to engage directly with the landscape — pools, terraces, and living spaces are arranged as a continuous descent toward the water.",
    concept:
      "Architecture as landscape. The building should not sit on the land but grow from it, taking its section from the topography and its materials from the site.",
    materials: [
      "Natural laterite stone",
      "Teak decking",
      "Reinforced concrete",
      "Corten steel accents",
      "Lime plaster",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "the-atelier-studios",
    title: "The Atelier Studios",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    category: "Mixed-Use",
    year: 2023,
    status: "Completed",
    area: "11,500 sq.ft.",
    shortDescription:
      "A mixed-use building for creative professionals — studios, gallery space, and a rooftop café.",
    description:
      "The Atelier Studios combines flexible studio spaces for architects, designers, and artists with a public-facing ground floor gallery and a rooftop café open to the neighbourhood.",
    concept:
      "A building that serves its users and its community equally — the private creative workspace above, the public cultural space below.",
    materials: [
      "Exposed brick",
      "Structural glass",
      "Weathering steel",
      "Bamboo screens",
      "Recycled timber",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
    ],
    featured: false,
  },
];
