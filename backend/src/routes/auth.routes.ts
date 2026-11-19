import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, getMe, changePassword } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Strict rate limit for login: max 5 attempts per 15 minutes per IP
// Prevents brute-force attacks on the admin login.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, login);
router.get("/me", authenticate, getMe);
router.patch("/password", authenticate, changePassword);

export default router;

