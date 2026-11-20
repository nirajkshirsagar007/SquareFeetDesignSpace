import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  Check,
  Eye,
} from "lucide-react";
import {
  projects as projectsApi,
  upload as uploadApi,
  SITE_URL,
  type ProjectPayload,
  type ProjectCategory,
  type ProjectStatus,
} from "@/lib/api";
import { slugify } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input, { Textarea, Select } from "@/components/ui/Input";
import toast from "react-hot-toast";

interface ProjectFormPageProps {
  mode: "create" | "edit";
}

const categoryOptions = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Hospitality", label: "Hospitality" },
  { value: "Institutional", label: "Institutional" },
  { value: "MixedUse", label: "Mixed-Use" },
];

const statusOptions = [
  { value: "Completed", label: "Completed" },
  { value: "Ongoing", label: "Ongoing" },
  { value: "Upcoming", label: "Upcoming" },
];

export default function ProjectFormPage({ mode }: ProjectFormPageProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadingGalleryIdx, setUploadingGalleryIdx] = useState<number | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("Residential");
  const [status, setStatus] = useState<ProjectStatus>("Completed");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [concept, setConcept] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  // Dynamic nested arrays
  const [materials, setMaterials] = useState<{ material: string; order: number }[]>([]);
  const [gallery, setGallery] = useState<{ imageUrl: string; alt: string; order: number }[]>([]);
  const [timeline, setTimeline] = useState<{ phase: string; date: string; order: number }[]>([]);

  // Load project data if in edit mode
  useEffect(() => {
    if (mode === "edit" && id) {
      async function loadProject() {
        try {
          setIsLoading(true);
          const all = await projectsApi.getAll();
          const target = all.find((p) => p.id === id);
          if (!target) {
            toast.error("Project not found");
            navigate("/projects");
            return;
          }
          setTitle(target.title);
          setSlug(target.slug);
          setCategory(target.category);
          setStatus(target.status);
          setYear(target.year);
          setArea(target.area);
          setLocation(target.location);
          setCity(target.city);
          setCoverImage(target.coverImage);
          setShortDescription(target.shortDescription);
          setDescription(target.description);
          setConcept(target.concept);
          setFeatured(target.featured);
          setPublished(target.published);
          setSortOrder(target.sortOrder);

          setMaterials(target.materials.map((m) => ({ material: m.material, order: m.order })));
          setGallery(target.gallery.map((g) => ({ imageUrl: g.imageUrl, alt: g.alt, order: g.order })));
          setTimeline(target.timeline.map((t) => ({ phase: t.phase, date: t.date, order: t.order })));
        } catch (err: any) {
          toast.error(err.message || "Failed to load project details");
        } finally {
          setIsLoading(false);
        }
      }
      loadProject();
    }
  }, [mode, id, navigate]);

  // Auto-slug when title changes in create mode
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === "create") {
      setSlug(slugify(val));
    }
  };

  // Upload Cover Image directly to Cloudinary
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingCover(true);
      const url = await uploadApi.toCloudinary(file, "squarefeet/covers");
      setCoverImage(url);
      toast.success("Cover image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload cover image");
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Upload Gallery Image
  const handleGalleryUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingGalleryIdx(index);
      const url = await uploadApi.toCloudinary(file, "squarefeet/gallery");
      setGallery((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], imageUrl: url };
        return next;
      });
      toast.success("Gallery image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload gallery image");
    } finally {
      setUploadingGalleryIdx(null);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !coverImage || !city || !location) {
      toast.error("Please fill in all required fields (including cover image)");
      return;
    }

    const payload: ProjectPayload = {
      title,
      slug,
      category,
      status,
      year: Number(year),
      area,
      location,
      city,
      coverImage,
      shortDescription,
      description,
      concept,
      featured,
      published,
      sortOrder: Number(sortOrder),
      materials: materials.filter((m) => m.material.trim() !== ""),
      gallery: gallery.filter((g) => g.imageUrl.trim() !== ""),
      timeline: timeline.filter((t) => t.phase.trim() !== ""),
    };

    try {
      setIsSubmitting(true);
      if (mode === "create") {
        await projectsApi.create(payload);
        toast.success("Project created and published to live site!");
      } else {
        await projectsApi.update(id!, payload);
        toast.success("Project updated and revalidated!");
      }
      navigate("/projects");
    } catch (err: any) {
      toast.error(err.message || "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/projects"
            className="p-2 rounded border border-charcoal/10 bg-white text-charcoal hover:bg-ivory transition-colors flex-shrink-0"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-charcoal truncate">
              {mode === "create" ? "Create New Project" : `Edit Project: ${title}`}
            </h1>
            <p className="text-xs text-charcoal-muted truncate">
              {mode === "create"
                ? "Add a new architectural case study to the portfolio"
                : "Update project information and gallery"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {mode === "edit" && (
            <a
              href={`${SITE_URL}/projects/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-charcoal/20 bg-white text-charcoal rounded hover:bg-ivory"
            >
              <Eye size={14} />
              <span>Preview Live</span>
            </a>
          )}
          <Button
            type="submit"
            form="project-form"
            loading={isSubmitting}
            className="flex-1 sm:flex-initial"
          >
            <Save size={16} />
            <span>{mode === "create" ? "Create Project" : "Save Changes"}</span>
          </Button>
        </div>
      </div>

      <form id="project-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details Card */}
        <div className="bg-white p-6 rounded-lg border border-charcoal/10 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-charcoal pb-2 border-b border-charcoal/10">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Project Title"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. The Courtyard House"
            />
            <Input
              label="URL Slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. the-courtyard-house"
              hint="Used in the URL: /projects/your-slug"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value as ProjectCategory)}
              options={categoryOptions}
            />
            <Select
              label="Status"
              required
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              options={statusOptions}
            />
            <Input
              label="Completion Year"
              type="number"
              required
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Area (Built-up)"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. 4,500 sq ft"
            />
            <Input
              label="Location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Jubilee Hills"
            />
            <Input
              label="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Hyderabad"
            />
          </div>
        </div>

        {/* Media & Cover Image Card */}
        <div className="bg-white p-6 rounded-lg border border-charcoal/10 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-charcoal pb-2 border-b border-charcoal/10">
            Cover Image
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {coverImage ? (
              <div className="relative group w-48 h-32 rounded border border-charcoal/15 overflow-hidden flex-shrink-0 bg-ivory">
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  className="absolute top-2 right-2 bg-charcoal/80 text-white p-1 rounded hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div className="w-48 h-32 border-2 border-dashed border-charcoal/20 rounded flex flex-col items-center justify-center text-charcoal-muted flex-shrink-0 bg-ivory/50">
                <ImageIcon size={28} className="mb-1 text-charcoal/30" />
                <span className="text-xs">No cover image</span>
              </div>
            )}

            <div className="flex-1 space-y-3 w-full">
              <Input
                label="Cover Image URL"
                required
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/... or upload below"
              />

              <div className="flex items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 border border-charcoal/20 rounded bg-white text-xs font-medium text-charcoal hover:bg-ivory transition-colors">
                  <Upload size={14} className="text-gold" />
                  <span>{isUploadingCover ? "Uploading to Cloudinary..." : "Upload File"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    disabled={isUploadingCover}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-charcoal-muted">Signed Cloudinary direct upload</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Descriptions */}
        <div className="bg-white p-6 rounded-lg border border-charcoal/10 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-charcoal pb-2 border-b border-charcoal/10">
            Project Narrative
          </h2>

          <Input
            label="Short Summary"
            required
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="A single sentence describing the project concept..."
          />

          <Textarea
            label="Full Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed architectural background, design challenges, client brief..."
            rows={4}
          />

          <Textarea
            label="Design Concept & Philosophy"
            required
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Spatial philosophy, light distribution, material rationale..."
            rows={3}
          />
        </div>

        {/* Materials & Gallery & Timeline */}
        <div className="bg-white p-6 rounded-lg border border-charcoal/10 shadow-sm space-y-6">
          <h2 className="text-base font-semibold text-charcoal pb-2 border-b border-charcoal/10">
            Materials & Finishes
          </h2>

          <div className="space-y-3">
            {materials.map((m, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="e.g. Exposed Teak Wood, Travertine Stone"
                  value={m.material}
                  onChange={(e) => {
                    const next = [...materials];
                    next[idx].material = e.target.value;
                    setMaterials(next);
                  }}
                  className="flex-1 px-3 py-2 bg-ivory/50 border border-charcoal/15 rounded text-sm outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => setMaterials(materials.filter((_, i) => i !== idx))}
                  className="p-2 text-charcoal-muted hover:text-red-500 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setMaterials([...materials, { material: "", order: materials.length }])}
            >
              <Plus size={14} />
              <span>Add Material</span>
            </Button>
          </div>
        </div>

        {/* Gallery Images Card */}
        <div className="bg-white p-6 rounded-lg border border-charcoal/10 shadow-sm space-y-6">
          <h2 className="text-base font-semibold text-charcoal pb-2 border-b border-charcoal/10">
            Gallery Images
          </h2>

          <div className="space-y-4">
            {gallery.map((g, idx) => (
              <div key={idx} className="p-4 bg-ivory/40 rounded border border-charcoal/10 flex flex-col md:flex-row items-center gap-4">
                {g.imageUrl ? (
                  <img
                    src={g.imageUrl}
                    alt={g.alt || "Gallery preview"}
                    className="w-20 h-16 rounded object-cover border border-charcoal/10 flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-16 rounded border border-dashed border-charcoal/20 flex items-center justify-center text-charcoal-muted flex-shrink-0">
                    <ImageIcon size={20} />
                  </div>
                )}

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <Input
                    placeholder="Image URL"
                    value={g.imageUrl}
                    onChange={(e) => {
                      const next = [...gallery];
                      next[idx].imageUrl = e.target.value;
                      setGallery(next);
                    }}
                  />
                  <Input
                    placeholder="Alt text / Caption"
                    value={g.alt}
                    onChange={(e) => {
                      const next = [...gallery];
                      next[idx].alt = e.target.value;
                      setGallery(next);
                    }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="cursor-pointer p-2 border border-charcoal/20 bg-white rounded text-xs hover:bg-ivory" title="Upload Image">
                    <Upload size={16} className="text-gold" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGalleryUpload(idx, e)}
                      disabled={uploadingGalleryIdx === idx}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                    className="p-2 text-charcoal-muted hover:text-red-500 rounded"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setGallery([...gallery, { imageUrl: "", alt: "", order: gallery.length }])}
            >
              <Plus size={14} />
              <span>Add Gallery Image</span>
            </Button>
          </div>
        </div>

        {/* Project Timeline Card */}
        <div className="bg-white p-6 rounded-lg border border-charcoal/10 shadow-sm space-y-6">
          <h2 className="text-base font-semibold text-charcoal pb-2 border-b border-charcoal/10">
            Project Timeline & Milestones
          </h2>

          <div className="space-y-3">
            {timeline.map((t, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-0 bg-ivory/30 sm:bg-transparent rounded sm:rounded-none border sm:border-0 border-charcoal/10">
                <input
                  type="text"
                  placeholder="Phase (e.g. Concept Design, Construction)"
                  value={t.phase}
                  onChange={(e) => {
                    const next = [...timeline];
                    next[idx].phase = e.target.value;
                    setTimeline(next);
                  }}
                  className="flex-1 px-3 py-2 bg-ivory/50 border border-charcoal/15 rounded text-sm outline-none focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="Date / Duration (e.g. Jan 2024 - Mar 2024)"
                  value={t.date}
                  onChange={(e) => {
                    const next = [...timeline];
                    next[idx].date = e.target.value;
                    setTimeline(next);
                  }}
                  className="w-full sm:w-64 px-3 py-2 bg-ivory/50 border border-charcoal/15 rounded text-sm outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => setTimeline(timeline.filter((_, i) => i !== idx))}
                  className="self-end sm:self-auto p-2 text-charcoal-muted hover:text-red-500 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setTimeline([...timeline, { phase: "", date: "", order: timeline.length }])}
            >
              <Plus size={14} />
              <span>Add Milestone</span>
            </Button>
          </div>
        </div>

        {/* Publishing & Visibility Settings */}
        <div className="bg-white p-6 rounded-lg border border-charcoal/10 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-charcoal pb-2 border-b border-charcoal/10">
            Publishing Settings
          </h2>

          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 accent-gold rounded cursor-pointer"
              />
              <div>
                <span className="text-sm font-medium text-charcoal">Published</span>
                <p className="text-xs text-charcoal-muted">Visible to the public on the website</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 accent-gold rounded cursor-pointer"
              />
              <div>
                <span className="text-sm font-medium text-charcoal">Featured Work</span>
                <p className="text-xs text-charcoal-muted">Showcase in homepage carousel</p>
              </div>
            </label>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/projects")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            size="lg"
          >
            <Save size={16} />
            <span>{mode === "create" ? "Create & Publish" : "Save Changes"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
