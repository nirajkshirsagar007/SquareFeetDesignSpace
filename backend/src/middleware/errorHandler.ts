import { Request, Response, NextFunction } from "express";
import { sendError } from "../lib/response";

// Global error handler — must be last middleware in app
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("❌ Unhandled error:", err);

  // Prisma unique constraint violation
  if (err.message.includes("Unique constraint")) {
    sendError(res, "A record with this value already exists.", 409);
    return;
  }

  // Prisma record not found
  if (err.message.includes("Record to update not found")) {
    sendError(res, "Record not found.", 404);
    return;
  }

  sendError(
    res,
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message,
    500
  );
};
