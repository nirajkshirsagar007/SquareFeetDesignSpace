import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { asyncHandler, sendSuccess, sendError } from "../lib/response";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// POST /api/auth/login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    sendError(res, "Invalid input", 400, result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    sendError(res, "Invalid email or password", 401);
    return;
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    sendError(res, "Invalid email or password", 401);
    return;
  }

  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? "7d" }
  );

  sendSuccess(res, {
    token,
    admin: { id: admin.id, email: admin.email, name: admin.name },
  });
});

// GET /api/auth/me  (protected)
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const admin = await prisma.admin.findUnique({
    where: { id: req.admin!.adminId },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  if (!admin) {
    sendError(res, "Admin not found", 404);
    return;
  }

  sendSuccess(res, admin);
});
