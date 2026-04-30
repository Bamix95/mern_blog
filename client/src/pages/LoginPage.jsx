import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validators/auth.validators";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, handleLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const success = await handleLogin(data);
    if (success) {
      reset();
      navigate("/home", { replace: true });
    }
  };

  return (
    <AuthLayout subTitle="Sign in to read and write.">
      <form noValidate className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-text-body text-sm font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="jane@example.com"
            autoComplete="email"
            {...register("email")}
            className="w-full border border-border px-3 py-2.5 text-sm outline-none rounded-lg
              focus:ring-1 focus:ring-accent transition-all duration-150 ease-linear"
          />
          {errors.email && (
            <small className="text-xs text-red-500">
              {errors.email.message}
            </small>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-text-body text-sm font-semibold"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              {...register("password")}
              className="w-full border border-border px-3 py-2.5 pr-10 text-sm outline-none rounded-lg
                focus:ring-1 focus:ring-accent transition-all duration-150 ease-linear"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted
                hover:text-text-primary transition duration-150 ease-linear"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <small className="text-xs text-red-500">
              {errors.password.message}
            </small>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full flex items-center justify-center bg-accent py-2.5 rounded-lg
            text-white text-sm font-medium tracking-normal hover:bg-accent/90
            transition-all duration-200 ease-linear"
        >
          {isLoggingIn ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-text-muted">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-text-primary font-medium hover:text-accent hover:underline
            underline-offset-2 transition duration-200 ease-linear"
        >
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
