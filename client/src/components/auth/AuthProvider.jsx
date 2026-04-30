import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAuthStore from "../../store/auth";

const AuthProvider = ({ children }) => {
  const { getMe } = useAuth();
  const { isLoading } = useAuthStore();

  useEffect(() => {
    getMe();
  }, [getMe]);

  if (isLoading)
    return (
      <div className="w-full h-screen grid place-items-center">
        <Loader2 className="animate-spin text-text-muted" size={32} />
      </div>
    );

  return children;
};

export default AuthProvider;
