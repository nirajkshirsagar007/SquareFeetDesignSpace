import { useState } from "react";
import { KeyRound, ShieldCheck, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { auth as authApi } from "@/lib/api";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface TopbarProps {
  title?: string;
  subtitle?: string;
  onToggleMobileMenu?: () => void;
}

export default function Topbar({ title, subtitle, onToggleMobileMenu }: TopbarProps) {
  const { user } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    try {
      setIsSubmitting(true);
      await authApi.changePassword(currentPassword, newPassword);
      toast.success("Password updated successfully");
      setIsPasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-charcoal/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 -ml-1 text-charcoal/70 hover:text-charcoal hover:bg-ivory rounded transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          <div>
            {title && <h2 className="text-base sm:text-lg font-semibold text-charcoal leading-tight truncate">{title}</h2>}
            {subtitle && <p className="text-xs text-charcoal-muted hidden sm:block">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium text-charcoal/70 hover:text-charcoal px-2.5 sm:px-3 py-1.5 rounded border border-charcoal/15 hover:bg-ivory transition-colors"
            title="Change Password"
          >
            <KeyRound size={14} className="text-gold flex-shrink-0" />
            <span className="hidden sm:inline">Change Password</span>
            <span className="sm:hidden">Password</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-3 border-l border-charcoal/15">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="text-xs font-medium text-charcoal/80 flex items-center gap-1 max-w-[120px] sm:max-w-none truncate">
              <ShieldCheck size={14} className="text-gold flex-shrink-0" />
              <span className="truncate">{user?.email}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Admin Password"
        size="sm"
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Input
            label="New Password (min 8 characters)"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Input
            label="Confirm New Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Update Password
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
