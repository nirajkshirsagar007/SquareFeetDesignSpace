import { Router } from "express";
import {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../controllers/inquiries.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Public — from contact form
router.post("/", createInquiry);

// Admin-only
router.get("/", authenticate, getAllInquiries);
router.patch("/:id/status", authenticate, updateInquiryStatus);
router.delete("/:id", authenticate, deleteInquiry);

export default router;
