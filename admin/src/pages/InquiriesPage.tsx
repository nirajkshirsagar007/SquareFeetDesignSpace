import { useEffect, useState } from "react";
import {
  Mail,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Send,
  User,
  Phone,
  DollarSign,
  Calendar,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { inquiries as inquiriesApi, type Inquiry, type InquiryStatus } from "@/lib/api";
import { formatDateTime, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

const statusFilters: { label: string; value: string }[] = [
  { label: "All Inquiries", value: "ALL" },
  { label: "New", value: "New" },
  { label: "Read", value: "Read" },
  { label: "Replied", value: "Replied" },
];

export default function InquiriesPage() {
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  // Delete modal state
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const data = await inquiriesApi.getAll();
      setInquiriesList(data || []);
      if (data && data.length > 0 && !selectedInquiry) {
        setSelectedInquiry(data[0]);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load inquiries");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    try {
      await inquiriesApi.updateStatus(id, newStatus);
      setInquiriesList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      toast.success(`Inquiry marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!inquiryToDelete) return;
    try {
      setIsDeleting(true);
      await inquiriesApi.delete(inquiryToDelete.id);
      toast.success("Inquiry deleted");
      const remaining = inquiriesList.filter((i) => i.id !== inquiryToDelete.id);
      setInquiriesList(remaining);
      if (selectedInquiry?.id === inquiryToDelete.id) {
        setSelectedInquiry(remaining[0] || null);
        setMobileView("list");
      }
      setInquiryToDelete(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete inquiry");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredInquiries = inquiriesList.filter((item) => {
    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone && item.phone.includes(searchQuery)) ||
      (item.projectType && item.projectType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal">Customer Inquiries</h1>
        <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
          Direct leads and project inquiries submitted through the public website
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-lg border border-charcoal/10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
          <input
            type="text"
            placeholder="Search inquiries by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-ivory/50 border border-charcoal/15 rounded text-sm outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {statusFilters.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                statusFilter === tab.value
                  ? "bg-charcoal text-white"
                  : "bg-ivory text-charcoal-muted hover:text-charcoal hover:bg-ivory-dark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Pane Inbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left Pane: List (visible on desktop, or on mobile when mobileView === "list") */}
        <div
          className={cn(
            "bg-white rounded-lg border border-charcoal/10 shadow-sm overflow-hidden flex flex-col lg:col-span-5",
            mobileView === "detail" ? "hidden lg:flex" : "flex"
          )}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-8 text-center text-sm text-charcoal-muted my-auto">
              No inquiries found matching your filters.
            </div>
          ) : (
            <div className="divide-y divide-charcoal/5 overflow-y-auto max-h-[600px]">
              {filteredInquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => {
                      setSelectedInquiry(inq);
                      setMobileView("detail");
                      if (inq.status === "New") {
                        handleStatusChange(inq.id, "Read");
                      }
                    }}
                    className={`p-4 cursor-pointer transition-colors border-l-4 ${
                      isSelected
                        ? "bg-ivory/70 border-gold"
                        : inq.status === "New"
                        ? "bg-red-50/20 border-red-400 hover:bg-ivory/40"
                        : "border-transparent hover:bg-ivory/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-sm text-charcoal truncate">{inq.name}</span>
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

                    <p className="text-xs text-charcoal-muted truncate">{inq.email}</p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-charcoal/5">
                      <span className="text-xs text-gold-dark font-medium">
                        {inq.projectType || "General Consultation"}
                      </span>
                      <span className="text-[11px] text-charcoal-muted">
                        {formatDateTime(inq.submittedAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Pane: Detail View (visible on desktop, or on mobile when mobileView === "detail") */}
        <div
          className={cn(
            "bg-white rounded-lg border border-charcoal/10 shadow-sm p-4 sm:p-6 flex flex-col justify-between lg:col-span-7",
            mobileView === "list" ? "hidden lg:flex" : "flex"
          )}
        >
          {selectedInquiry ? (
            <div className="space-y-6">
              {/* Mobile Back Button (< lg) */}
              <div className="lg:hidden pb-3 border-b border-charcoal/10">
                <button
                  onClick={() => setMobileView("list")}
                  className="inline-flex items-center gap-2 text-xs font-medium text-charcoal-muted hover:text-charcoal px-2.5 py-1.5 rounded bg-ivory"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Inquiries List</span>
                </button>
              </div>

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 pb-4 border-b border-charcoal/10">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-charcoal">{selectedInquiry.name}</h2>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Submitted on {formatDateTime(selectedInquiry.submittedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      selectedInquiry.status === "New"
                        ? "red"
                        : selectedInquiry.status === "Read"
                        ? "yellow"
                        : "green"
                    }
                  >
                    Status: {selectedInquiry.status}
                  </Badge>
                  <button
                    onClick={() => setInquiryToDelete(selectedInquiry)}
                    className="p-1.5 text-charcoal-muted hover:text-red-500 rounded hover:bg-red-50 transition-colors"
                    title="Delete inquiry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Contact Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-ivory/40 p-3 sm:p-4 rounded-lg border border-charcoal/10 text-xs">
                <div className="flex items-center gap-2 text-charcoal">
                  <Mail size={16} className="text-gold flex-shrink-0" />
                  <a href={`mailto:${selectedInquiry.email}`} className="hover:underline font-medium truncate">
                    {selectedInquiry.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-charcoal">
                  <Phone size={16} className="text-gold flex-shrink-0" />
                  <span>{selectedInquiry.phone || "Not provided"}</span>
                </div>

                <div className="flex items-center gap-2 text-charcoal">
                  <User size={16} className="text-gold flex-shrink-0" />
                  <span>Category: {selectedInquiry.projectType || "General Consultation"}</span>
                </div>

                <div className="flex items-center gap-2 text-charcoal">
                  <DollarSign size={16} className="text-gold flex-shrink-0" />
                  <span>Budget: {selectedInquiry.budget || "Not specified"}</span>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-charcoal-muted mb-2">
                  Project Brief & Requirements
                </h3>
                <div className="p-4 bg-white border border-charcoal/10 rounded text-sm text-charcoal leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message || "No detailed note was submitted."}
                </div>
              </div>

              {/* Workflow Actions */}
              <div className="pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs text-charcoal-muted font-medium">Status:</span>
                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, "New")}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      selectedInquiry.status === "New"
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white border-charcoal/20 hover:bg-ivory"
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, "Read")}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      selectedInquiry.status === "Read"
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "bg-white border-charcoal/20 hover:bg-ivory"
                    }`}
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, "Replied")}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      selectedInquiry.status === "Replied"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white border-charcoal/20 hover:bg-ivory"
                    }`}
                  >
                    Replied
                  </button>
                </div>

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Square%20Feet%20Architects%20-%20Re:%20Your%20Inquiry`}
                  onClick={() => handleStatusChange(selectedInquiry.id, "Replied")}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gold hover:bg-gold-dark text-white text-xs font-semibold rounded shadow-sm transition-colors w-full sm:w-auto"
                >
                  <Send size={14} />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-sm text-charcoal-muted my-auto">
              Select an inquiry from the left pane to view details.
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!inquiryToDelete}
        onClose={() => setInquiryToDelete(null)}
        title="Delete Customer Inquiry"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-red-600 bg-red-50 p-3 rounded">
            <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-red-800">
              Are you sure you want to permanently delete the inquiry from <strong>{inquiryToDelete?.name}</strong>?
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => setInquiryToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              loading={isDeleting}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
