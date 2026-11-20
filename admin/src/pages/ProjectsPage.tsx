import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { projects as projectsApi, SITE_URL, type Project, type ProjectCategory } from "@/lib/api";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

const categories: { label: string; value: string }[] = [
  { label: "All Categories", value: "ALL" },
  { label: "Residential", value: "Residential" },
  { label: "Commercial", value: "Commercial" },
  { label: "Hospitality", value: "Hospitality" },
  { label: "Institutional", value: "Institutional" },
  { label: "Mixed-Use", value: "MixedUse" },
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Delete modal state
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectsApi.getAll();
      setProjectsList(data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    try {
      setIsDeleting(true);
      await projectsApi.delete(projectToDelete.id);
      toast.success(`Project "${projectToDelete.title}" deleted`);
      setProjectsList((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      setProjectToDelete(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter projects by category and search term
  const filteredProjects = projectsList.filter((p) => {
    const matchesCategory =
      selectedCategory === "ALL" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">Projects Portfolio</h1>
          <p className="text-sm text-charcoal-muted mt-1">
            Create, edit, organize architectural projects and sync with the public website
          </p>
        </div>
        <Link to="/projects/new">
          <Button>
            <Plus size={16} />
            <span>Create New Project</span>
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-charcoal/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
          <input
            type="text"
            placeholder="Search projects by title, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-ivory/50 border border-charcoal/15 rounded text-sm outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                selectedCategory === cat.value
                  ? "bg-charcoal text-white"
                  : "bg-ivory text-charcoal-muted hover:text-charcoal hover:bg-ivory-dark"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg border border-charcoal/10 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-charcoal-muted text-sm">No projects matched your criteria.</p>
            {(searchQuery || selectedCategory !== "ALL") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                }}
                className="mt-3 text-xs text-gold underline hover:text-gold-dark"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-charcoal">
              <thead className="bg-ivory/60 border-b border-charcoal/10 text-xs uppercase tracking-wider text-charcoal-muted">
                <tr>
                  <th className="px-6 py-3 font-semibold">Project</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Location</th>
                  <th className="px-6 py-3 font-semibold">Year & Area</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-ivory/30 transition-colors">
                    {/* Title & Cover */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          className="w-12 h-12 rounded object-cover border border-charcoal/10"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-charcoal">{proj.title}</span>
                            {proj.featured && (
                              <span title="Featured Project" className="text-gold">
                                <Star size={14} className="fill-gold" />
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-charcoal-muted">/{proj.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-xs font-medium">
                      <Badge variant="gray">{proj.category}</Badge>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-xs text-charcoal-muted">
                      {proj.city}, {proj.location}
                    </td>

                    {/* Year & Area */}
                    <td className="px-6 py-4 text-xs text-charcoal-muted">
                      {proj.year} · {proj.area}
                    </td>

                    {/* Published & Status */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <Badge variant={proj.published ? "green" : "gray"}>
                          {proj.published ? "Published" : "Draft"}
                        </Badge>
                        <span className="text-[11px] text-charcoal-muted">{proj.status}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`${SITE_URL}/projects/${proj.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on Live Site"
                          className="p-1.5 text-charcoal-muted hover:text-gold rounded hover:bg-ivory transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button
                          onClick={() => navigate(`/projects/${proj.id}/edit`)}
                          title="Edit Project"
                          className="p-1.5 text-charcoal-muted hover:text-charcoal rounded hover:bg-ivory transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setProjectToDelete(proj)}
                          title="Delete Project"
                          className="p-1.5 text-charcoal-muted hover:text-red-500 rounded hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        title="Confirm Project Deletion"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-red-600 bg-red-50 p-3 rounded">
            <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-red-800">
              Are you sure you want to permanently delete <strong>{projectToDelete?.title}</strong>? This action cannot be undone and will trigger an ISR revalidation on the public website.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => setProjectToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              loading={isDeleting}
            >
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
