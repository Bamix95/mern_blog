import { toast } from "sonner";
import useAuthStore from "../store/auth";
import { api } from "../lib/axios";
import { useState, useCallback } from "react";

const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleRegister = async (data) => {
    try {
      setIsRegistering(true);

      const res = await api.post("/auth/register", data);

      if (res.data?.status === "success") {
        toast.success(res.data.message || "Account created successfully");
        resetAuth();
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogin = async (data) => {
    try {
      setIsLoggingIn(true);

      const res = await api.post("/auth/login", data);

      if (res.data?.status === "success") {
        toast.success(
          res.data.message || `Welcome back, ${res.data.data.name}`,
        );
        setUser(res.data.data);
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const getMe = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/auth/me");

      if (res.data?.status === "success") {
        setUser(res.data.data);
      }
    } catch (error) {
      resetAuth();
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser, resetAuth]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      resetAuth();
      toast.success("Logged out successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      return false;
    }
  };

  return {
    handleRegister,
    handleLogin,
    logout,
    getMe,
    isRegistering,
    isLoggingIn,
    isLoading,
  };
};

export default useAuth;
