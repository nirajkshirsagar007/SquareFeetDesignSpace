/**
 * api.ts — Admin panel API client
 *
 * All requests to the backend go through these functions.
 * The token is read from localStorage (set by AuthContext after login).
 *
 * Pattern: each namespace (projects, inquiries, auth, upload) has
 * typed async functions that return data or throw an Error with a
 * user-readable message.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// ── Token helpers ─────────────────────────────────────────────────────────────

export const getToken = (): string | null => localStorage.getItem("admin_token");

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── Generic fetch wrapper ─────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers as Record<string, string>),
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? `Request failed: ${res.status}`);
  }

  return json.data as T;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";
export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Hospitality"
  | "Institutional"
  | "MixedUse";
export type InquiryStatus = "New" | "Read" | "Replied";

export interface ProjectMaterial {
  id: string;
  material: string;
  order: number;
}

export interface ProjectGalleryImage {
  id: string;
  imageUrl: string;
  alt: string;
  order: number;
}

export interface ProjectTimeline {
  id: string;
  phase: string;
  date: string;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  category: ProjectCategory;
  year: number;
  status: ProjectStatus;
  area: string;
  shortDescription: string;
  description: string;
  concept: string;
  coverImage: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  materials: ProjectMaterial[];
  gallery: ProjectGalleryImage[];
  timeline: ProjectTimeline[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  budget: string | null;
  message: string;
  status: InquiryStatus;
  submittedAt: string;
  readAt: string | null;
  repliedAt: string | null;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface UploadSignature {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
}

// ── Project form payload ──────────────────────────────────────────────────────

export interface ProjectPayload {
  slug: string;
  title: string;
  location: string;
  city: string;
  category: ProjectCategory;
  year: number;
  status: ProjectStatus;
  area: string;
  shortDescription: string;
  description: string;
  concept: string;
  coverImage: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  materials: { material: string; order: number }[];
  gallery: { imageUrl: string; alt: string; order: number }[];
  timeline: { phase: string; date: string; order: number }[];
}

// ── Auth API ──────────────────────────────────────────────────────────────────

export const auth = {
  login: (email: string, password: string) =>
    request<{ token: string; admin: AdminUser }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<AdminUser>("/api/auth/me"),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<null>("/api/auth/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

// ── Projects API ──────────────────────────────────────────────────────────────

export const projects = {
  // Admin gets ALL projects (including unpublished drafts)
  getAll: () => request<Project[]>("/api/projects/admin/all"),

  getBySlug: (slug: string) => request<Project>(`/api/projects/${slug}`),

  create: (data: ProjectPayload) =>
    request<Project>("/api/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<ProjectPayload>) =>
    request<Project>(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<null>(`/api/projects/${id}`, { method: "DELETE" }),
};

// ── Inquiries API ─────────────────────────────────────────────────────────────

export const inquiries = {
  getAll: (status?: InquiryStatus) =>
    request<Inquiry[]>(`/api/inquiries${status ? `?status=${status}` : ""}`),

  updateStatus: (id: string, status: InquiryStatus) =>
    request<Inquiry>(`/api/inquiries/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  delete: (id: string) =>
    request<null>(`/api/inquiries/${id}`, { method: "DELETE" }),
};

// ── Upload API ────────────────────────────────────────────────────────────────

export const upload = {
  // Step 1: get a signature from the backend
  getSignature: (folder?: string) =>
    request<UploadSignature>("/api/upload/signature", {
      method: "POST",
      body: JSON.stringify({ folder }),
    }),

  // Step 2: upload file directly to Cloudinary using the signature
  toCloudinary: async (file: File, folder?: string): Promise<string> => {
    const sig = await upload.getSignature(folder);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", sig.apiKey);
    formData.append("timestamp", String(sig.timestamp));
    formData.append("signature", sig.signature);
    formData.append("folder", sig.folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message ?? "Cloudinary upload failed");
    }

    const data = await res.json();
    // Return the secure HTTPS URL of the uploaded image
    return data.secure_url as string;
  },
};
