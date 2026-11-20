import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, Mail, ExternalLink, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { SITE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/inquiries", label: "Inquiries", icon: Mail },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-sidebar text-ivory flex flex-col min-h-screen border-r border-charcoal/30">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-gold font-medium">Studio Admin</span>
        <h1 className="font-display text-xl font-bold tracking-tight text-white">Square Feet</h1>
        <p className="text-xs text-charcoal-muted">Design Space & Architecture</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-gold text-white shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/10">
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2 text-sm text-white/60 hover:text-gold transition-colors rounded hover:bg-white/5"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={16} />
              View Live Site
            </span>
            <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/50">Next.js</span>
          </a>
        </div>
      </nav>

      {/* User info & Logout */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.name || "Administrator"}</p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-white/60 hover:text-red-400 hover:bg-white/5 rounded transition-colors"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}
