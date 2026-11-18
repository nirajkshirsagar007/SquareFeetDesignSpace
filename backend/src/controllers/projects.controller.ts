import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { asyncHandler, sendSuccess, sendError } from "../lib/response";
import { z } from "zod";

// ── Validation Schemas ───────────────────────────────────

const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  city: z.string().min(1),
  category: z.enum([
    "Residential",
    "Commercial",
    "Hospitality",
    "Institutional",
    "MixedUse",
  ]),
  year: z.number().int().min(1900).max(2100),
  status: z.enum(["Completed", "Ongoing", "Upcoming"]),
  area: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  concept: z.string().min(1),
  coverImage: z.string().url(),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
  materials: z
    .array(z.object({ material: z.string(), order: z.number().optional() }))
    .optional()
    .default([]),
  gallery: z
    .array(
      z.object({
        imageUrl: z.string().url(),
        alt: z.string().optional(),
        order: z.number().optional(),
      })
    )
    .optional()
    .default([]),
  timeline: z
    .array(
      z.object({
        phase: z.string(),
        date: z.string(),
        order: z.number().optional(),
      })
    )
    .optional()
    .default([]),
});

// ── Controllers ──────────────────────────────────────────

// GET /api/projects  (public)
export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const { category, status, featured } = req.query;

    const projects = await prisma.project.findMany({
      where: {
        published: true,
        ...(category && { category: category as any }),
        ...(status && { status: status as any }),
        ...(featured === "true" && { featured: true }),
      },
      include: {
        materials: { orderBy: { order: "asc" } },
        gallery: { orderBy: { order: "asc" } },
        timeline: { orderBy: { order: "asc" } },
      },
      orderBy: [{ sortOrder: "asc" }, { year: "desc" }],
    });

    sendSuccess(res, projects);
  }
);

// GET /api/projects/:slug  (public)
export const getProjectBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await prisma.project.findUnique({
      where: { slug: req.params.slug, published: true },
      include: {
        materials: { orderBy: { order: "asc" } },
        gallery: { orderBy: { order: "asc" } },
        timeline: { orderBy: { order: "asc" } },
      },
    });

    if (!project) {
      sendError(res, "Project not found", 404);
      return;
    }

    sendSuccess(res, project);
  }
);

// POST /api/projects  (admin only)
export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const result = projectSchema.safeParse(req.body);
    if (!result.success) {
      sendError(res, "Validation failed", 400, result.error.flatten());
      return;
    }

    const { materials, gallery, timeline, ...projectData } = result.data;

    const project = await prisma.project.create({
      data: {
        ...projectData,
        materials: {
          create: materials.map((m, i) => ({
            material: m.material,
            order: m.order ?? i,
          })),
        },
        gallery: {
          create: gallery.map((g, i) => ({
            imageUrl: g.imageUrl,
            alt: g.alt ?? "",
            order: g.order ?? i,
          })),
        },
        timeline: {
          create: timeline.map((t, i) => ({
            phase: t.phase,
            date: t.date,
            order: t.order ?? i,
          })),
        },
      },
      include: {
        materials: true,
        gallery: true,
        timeline: true,
      },
    });

    sendSuccess(res, project, 201, "Project created successfully");
  }
);

// PUT /api/projects/:id  (admin only)
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const result = projectSchema.partial().safeParse(req.body);
    if (!result.success) {
      sendError(res, "Validation failed", 400, result.error.flatten());
      return;
    }

    const { materials, gallery, timeline, ...projectData } = result.data;

    // Delete existing relations and re-create (simplest update strategy)
    const project = await prisma.$transaction(async (tx) => {
      await tx.projectMaterial.deleteMany({ where: { projectId: req.params.id } });
      await tx.projectGallery.deleteMany({ where: { projectId: req.params.id } });
      await tx.projectTimeline.deleteMany({ where: { projectId: req.params.id } });

      return tx.project.update({
        where: { id: req.params.id },
        data: {
          ...projectData,
          ...(materials && {
            materials: {
              create: materials.map((m, i) => ({
                material: m.material,
                order: m.order ?? i,
              })),
            },
          }),
          ...(gallery && {
            gallery: {
              create: gallery.map((g, i) => ({
                imageUrl: g.imageUrl!,
                alt: g.alt ?? "",
                order: g.order ?? i,
              })),
            },
          }),
          ...(timeline && {
            timeline: {
              create: timeline.map((t, i) => ({
                phase: t.phase!,
                date: t.date!,
                order: t.order ?? i,
              })),
            },
          }),
        },
        include: { materials: true, gallery: true, timeline: true },
      });
    });

    sendSuccess(res, project, 200, "Project updated successfully");
  }
);

// DELETE /api/projects/:id  (admin only)
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    await prisma.project.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 200, "Project deleted successfully");
  }
);
