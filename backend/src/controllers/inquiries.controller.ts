import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { asyncHandler, sendSuccess, sendError } from "../lib/response";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional().default(""),
});

// POST /api/inquiries  (public — from contact form)
export const createInquiry = asyncHandler(
  async (req: Request, res: Response) => {
    const result = inquirySchema.safeParse(req.body);
    if (!result.success) {
      sendError(res, "Validation failed", 400, result.error.flatten());
      return;
    }

    const inquiry = await prisma.inquiry.create({ data: result.data });

    sendSuccess(res, { id: inquiry.id }, 201, "Inquiry submitted successfully");
  }
);

// GET /api/inquiries  (admin only)
export const getAllInquiries = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.query;

    const inquiries = await prisma.inquiry.findMany({
      where: { ...(status && { status: status as any }) },
      orderBy: { submittedAt: "desc" },
    });

    sendSuccess(res, inquiries);
  }
);

// PATCH /api/inquiries/:id/status  (admin only)
export const updateInquiryStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body;

    if (!["New", "Read", "Replied"].includes(status)) {
      sendError(res, "Invalid status value", 400);
      return;
    }

    const inquiry = await prisma.inquiry.update({
      where: { id: req.params.id as string },
      data: {
        status,
        ...(status === "Read" && { readAt: new Date() }),
        ...(status === "Replied" && { repliedAt: new Date() }),
      },
    });

    sendSuccess(res, inquiry, 200, "Status updated");
  }
);

// DELETE /api/inquiries/:id  (admin only)
export const deleteInquiry = asyncHandler(
  async (req: Request, res: Response) => {
    await prisma.inquiry.delete({ where: { id: req.params.id as string } });
    sendSuccess(res, null, 200, "Inquiry deleted");
  }
);
