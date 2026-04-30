import { Loader2 } from "lucide-react";
import useAuthStore from "../../store/auth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isLoading, isAuthenticated } = useAuthStore();

  if (isLoading)
    return (
      <div className="min-h-screen w-full grid place-items-center">
        <Loader2 className="animate-spin text-text-muted" size={32} />
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};
