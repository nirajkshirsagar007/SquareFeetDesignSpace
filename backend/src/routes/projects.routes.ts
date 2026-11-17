import { Router } from "express";
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/", getAllProjects);
router.get("/:slug", getProjectBySlug);

// Admin-only routes (require JWT token)
router.post("/", authenticate, createProject);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

export default router;
