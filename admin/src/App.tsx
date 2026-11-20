import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import AppRouter from "@/router";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
        {/* Global toast notifications — appears top-right */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#111111",
              color: "#F5F3EF",
              borderRadius: "4px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#C8964A", secondary: "#F5F3EF" },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
