import { useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Failed to log in. Check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-gold font-medium mb-1">Architecture & Design Space</p>
          <h1 className="font-display text-3xl font-bold text-charcoal">Square Feet</h1>
          <p className="text-sm text-charcoal-muted mt-2">Administrative Management Portal</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-charcoal/10 rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="Admin Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@squarefeetarchitect.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              size="lg"
              loading={isLoading}
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-charcoal/10 text-center">
            <p className="text-xs text-charcoal-muted">
              Default access configured via system database seed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
