/**
 * router/index.tsx
 *
 * Defines all routes for the admin panel:
 * - /login            → LoginPage (public)
 * - /                 → redirect to /dashboard
 * - /dashboard        → DashboardPage (protected)
 * - /projects         → ProjectsPage (protected)
 * - /projects/new     → ProjectFormPage in create mode (protected)
 * - /projects/:id/edit → ProjectFormPage in edit mode (protected)
 * - /inquiries        → InquiriesPage (protected)
 */

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectFormPage from "@/pages/ProjectFormPage";
import InquiriesPage from "@/pages/InquiriesPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Root → dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected — all wrapped in DashboardLayout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProjectsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/new"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProjectFormPage mode="create" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id/edit"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProjectFormPage mode="edit" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inquiries"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <InquiriesPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
