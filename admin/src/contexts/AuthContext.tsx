/**
 * AuthContext.tsx
 *
 * Provides authentication state to the entire admin panel.
 *
 * How it works:
 * 1. On mount, checks if a JWT token exists in localStorage.
 * 2. If yes, calls GET /api/auth/me to verify the token is still valid.
 * 3. Exposes: user, isLoading, login(), logout()
 *
 * Any component can call useAuth() to get the current admin user
 * and perform login/logout actions.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { auth as authApi, type AdminUser, getToken } from "@/lib/api";

interface AuthContextValue {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // start true: checking token

  // On first render, verify any saved token
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    authApi
      .me()
      .then((admin) => setUser(admin))
      .catch(() => {
        // Token is expired or invalid — clear it
        localStorage.removeItem("admin_token");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { token, admin } = await authApi.login(email, password);
    localStorage.setItem("admin_token", token);
    setUser(admin);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook — use inside any component to access auth state */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
