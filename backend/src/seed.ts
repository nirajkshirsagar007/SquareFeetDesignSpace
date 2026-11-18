/**
 * Database Seed Script
 * Run with: pnpm db:seed
 * Seeds the database with the existing static data from the frontend
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ── Admin User ───────────────────────────────────────────
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@squarefeetarchitect.com" },
    update: {},
    create: {
      email: "admin@squarefeetarchitect.com",
      passwordHash,
      name: "Square Feet Admin",
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);
  console.log(`   Password: admin123  ← CHANGE THIS AFTER FIRST LOGIN\n`);

  // ── Projects ─────────────────────────────────────────────
  const projectsData = [
    {
      slug: "the-courtyard-house",
      title: "The Courtyard House",
      location: "Pune, Maharashtra",
      city: "Pune",
      category: "Residential" as const,
      year: 2024,
      status: "Completed" as const,
      area: "4,500 sq.ft.",
      shortDescription:
        "A contemporary residence designed around natural light, open spaces, and material honesty.",
      description:
        "The Courtyard House reimagines the traditional Indian courtyard typology for contemporary living. Every room relates to the central open-air court, ensuring cross-ventilation, natural light, and a strong connection to the outside across all seasons.",
      concept:
        "The design originated from a single spatial question: what if the void — the empty courtyard — became the house rather than the house surrounding it? All living spaces orbit this central garden, creating a sequence of thresholds between interior and exterior.",
      coverImage:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=85",
      featured: true,
      materials: [
        "Exposed concrete",
        "Kota stone flooring",
        "Reclaimed teak",
        "Steel profiles",
        "Handmade brick",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=85",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85",
      ],
      timeline: [
        { phase: "Concept Design", date: "Jan 2022" },
        { phase: "Planning & Approvals", date: "Jun 2022" },
        { phase: "Construction Start", date: "Sep 2022" },
        { phase: "Handover", date: "Mar 2024" },
      ],
    },
    {
      slug: "meridian-offices",
      title: "Meridian Offices",
      location: "Mumbai, Maharashtra",
      city: "Mumbai",
      category: "Commercial" as const,
      year: 2024,
      status: "Completed" as const,
      area: "18,000 sq.ft.",
      shortDescription:
        "A mid-rise commercial workspace that balances open collaboration and focused work environments.",
      description:
        "Meridian Offices was conceived as a workplace that respects both the need for focused individual work and the energy of collaborative exchange. The floor plan offers a gradient from public to private, from loud to quiet, without rigid partitions.",
      concept:
        "A continuous landscape of work — one uninterrupted floor plate with programmatic zones defined by material, light, and level changes rather than walls.",
      coverImage:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85",
      featured: true,
      materials: [
        "Polished concrete floors",
        "Blackened steel",
        "White oak millwork",
        "Acoustic plaster",
        "Terrazzo details",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85",
        "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=85",
      ],
      timeline: [
        { phase: "Brief & Strategy", date: "May 2022" },
        { phase: "Interior Fit-out", date: "Oct 2023" },
        { phase: "Completion", date: "Aug 2024" },
      ],
    },
    {
      slug: "sea-cliff-villa",
      title: "Sea Cliff Villa",
      location: "Goa",
      city: "Goa",
      category: "Residential" as const,
      year: 2025,
      status: "Ongoing" as const,
      area: "7,200 sq.ft.",
      shortDescription:
        "A luxury villa perched above the sea, designed to dissolve the boundary between architecture and landscape.",
      description:
        "Sea Cliff Villa occupies a dramatic coastal site overlooking the Arabian Sea. The building steps down the topography, allowing each level to engage directly with the landscape.",
      concept:
        "Architecture as landscape. The building should not sit on the land but grow from it, taking its section from the topography and its materials from the site.",
      coverImage:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=85",
      featured: true,
      materials: [
        "Natural laterite stone",
        "Teak decking",
        "Reinforced concrete",
        "Corten steel accents",
        "Lime plaster",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
      ],
      timeline: [
        { phase: "Site Study", date: "Feb 2023" },
        { phase: "Excavation", date: "Nov 2023" },
        { phase: "Structure", date: "Present" },
        { phase: "Expected Completion", date: "Dec 2025" },
      ],
    },
    {
      slug: "the-atelier-studios",
      title: "The Atelier Studios",
      location: "Bengaluru, Karnataka",
      city: "Bengaluru",
      category: "MixedUse" as const,
      year: 2023,
      status: "Completed" as const,
      area: "11,500 sq.ft.",
      shortDescription:
        "A mixed-use building for creative professionals — studios, gallery space, and a rooftop café.",
      description:
        "The Atelier Studios combines flexible studio spaces for architects, designers, and artists with a public-facing ground floor gallery and a rooftop café open to the neighbourhood.",
      concept:
        "A building that serves its users and its community equally — the private creative workspace above, the public cultural space below.",
      coverImage:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85",
      featured: false,
      materials: [
        "Exposed brick",
        "Structural glass",
        "Weathering steel",
        "Bamboo screens",
        "Recycled timber",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
      ],
      timeline: [
        { phase: "Concept", date: "Apr 2020" },
        { phase: "Construction", date: "Feb 2021" },
        { phase: "Inauguration", date: "May 2023" },
      ],
    },
  ];

  for (const [i, p] of projectsData.entries()) {
    const { materials, gallery, timeline, ...projectData } = p;

    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...projectData,
        sortOrder: i,
        materials: { create: materials.map((m, j) => ({ material: m, order: j })) },
        gallery: { create: gallery.map((url, j) => ({ imageUrl: url, order: j })) },
        timeline: { create: timeline.map((t, j) => ({ ...t, order: j })) },
      },
    });

    console.log(`✅ Project seeded: ${p.title}`);
  }

  console.log("\n✨ Seeding complete!");
  console.log("─────────────────────────────────");
  console.log("Admin login credentials:");
  console.log("  Email:    admin@squarefeetarchitect.com");
  console.log("  Password: admin123");
  console.log("─────────────────────────────────\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
