import { Request, Response, NextFunction } from "express";

// ── Async wrapper — eliminates try/catch boilerplate in every controller ──
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// ── Standardized API response helpers ──
export const sendSuccess = (
  res: Response,
  data: unknown,
  statusCode = 200,
  message?: string
) => {
  res.status(statusCode).json({
    success: true,
    message: message ?? "OK",
    data,
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  details?: unknown
) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
  });
};
