import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Mail,
  Star,
  CheckCircle2,
  Clock,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { projects as projectsApi, inquiries as inquiriesApi, type Project, type Inquiry } from "@/lib/api";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [projRes, inqRes] = await Promise.all([
          projectsApi.getAll(),
          inquiriesApi.getAll(),
        ]);
        setProjectsList(projRes || []);
        setInquiriesList(inqRes || []);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const totalProjects = projectsList.length;
  const publishedCount = projectsList.filter((p) => p.published).length;
  const featuredCount = projectsList.filter((p) => p.featured).length;
  const newInquiriesCount = inquiriesList.filter((i) => i.status === "New").length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">Studio Overview</h1>
          <p className="text-sm text-charcoal-muted mt-1">
            Real-time management for Square Feet Architecture & Interior Design
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/projects/new">
            <Button size="sm">
              <Plus size={16} />
              <span>Add New Project</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-charcoal/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-charcoal-muted">Total Projects</p>
            <p className="text-2xl font-bold text-charcoal mt-1">{totalProjects}</p>
            <p className="text-xs text-charcoal-muted mt-1">{publishedCount} published live</p>
          </div>
          <div className="w-12 h-12 bg-ivory rounded-lg flex items-center justify-center text-charcoal">
            <FolderKanban size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-charcoal/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-charcoal-muted">Featured Works</p>
            <p className="text-2xl font-bold text-charcoal mt-1">{featuredCount}</p>
            <p className="text-xs text-charcoal-muted mt-1">Highlighted on homepage</p>
          </div>
          <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center text-gold">
            <Star size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-charcoal/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-charcoal-muted">New Inquiries</p>
            <p className="text-2xl font-bold text-charcoal mt-1">{newInquiriesCount}</p>
            <p className="text-xs text-charcoal-muted mt-1">Requires review/reply</p>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-charcoal/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-charcoal-muted">Total Inquiries</p>
            <p className="text-2xl font-bold text-charcoal mt-1">{inquiriesList.length}</p>
            <p className="text-xs text-charcoal-muted mt-1">From public contact forms</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
            <Mail size={24} />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Inquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-lg border border-charcoal/10 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-charcoal/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-gold" />
              <h2 className="font-semibold text-charcoal">Recent Inquiries</h2>
            </div>
            <Link to="/inquiries" className="text-xs font-medium text-gold hover:underline flex items-center gap-1">
              View All ({inquiriesList.length})
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-charcoal/5 flex-1">
            {inquiriesList.length === 0 ? (
              <div className="p-8 text-center text-sm text-charcoal-muted">No inquiries received yet.</div>
            ) : (
              inquiriesList.slice(0, 5).map((inq) => (
                <div key={inq.id} className="p-4 hover:bg-ivory/50 transition-colors flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-charcoal truncate">{inq.name}</p>
                      <Badge
                        variant={
                          inq.status === "New"
                            ? "red"
                            : inq.status === "Read"
                            ? "yellow"
                            : "green"
                        }
                      >
                        {inq.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-0.5">{inq.email} {inq.phone ? `· ${inq.phone}` : ""}</p>
                    <p className="text-xs text-charcoal/80 mt-1 line-clamp-1 italic">
                      "{inq.message || inq.projectType || "General consultation"}"
                    </p>
                  </div>
                  <span className="text-xs text-charcoal-muted whitespace-nowrap">
                    {formatDate(inq.submittedAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-lg border border-charcoal/10 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-charcoal/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderKanban size={18} className="text-gold" />
              <h2 className="font-semibold text-charcoal">Portfolio Projects</h2>
            </div>
            <Link to="/projects" className="text-xs font-medium text-gold hover:underline flex items-center gap-1">
              Manage All ({totalProjects})
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-charcoal/5 flex-1">
            {projectsList.length === 0 ? (
              <div className="p-8 text-center text-sm text-charcoal-muted">No projects created yet.</div>
            ) : (
              projectsList.slice(0, 5).map((proj) => (
                <div key={proj.id} className="p-4 hover:bg-ivory/50 transition-colors flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-12 h-12 rounded object-cover border border-charcoal/10 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-charcoal truncate">{proj.title}</p>
                      <p className="text-xs text-charcoal-muted">{proj.category} · {proj.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={proj.published ? "green" : "gray"}>
                      {proj.published ? "Published" : "Draft"}
                    </Badge>
                    {proj.featured && <Badge variant="gold">Featured</Badge>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
