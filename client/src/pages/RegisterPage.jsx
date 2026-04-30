import AuthLayout from "../components/auth/AuthLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../validators/auth.validators";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(registerSchema), mode: "onTouched" });
  const { isRegistering, handleRegister } = useAuth();

  const onSubmit = async (data) => {
    const success = await handleRegister(data);
    if (success) {
      reset();
      navigate("/login", { replace: true });
    }
  };

  return (
    <AuthLayout subTitle="One account. Every story.">
      <form noValidate className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-text-body text-sm font-semibold"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Jane Smith"
            autoComplete="name"
            {...register("name")}
            className="w-full border border-border px-3 py-2.5 text-sm outline-none rounded-lg
              focus:ring-1 focus:ring-accent transition-all duration-150 ease-linear"
          />
          {errors.name && (
            <small className="text-xs text-red-500">
              {errors.name.message}
            </small>
          )}
        </div>

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
          disabled={isRegistering}
          className="w-full flex items-center justify-center bg-accent py-2.5 rounded-lg
            text-white text-sm font-medium tracking-normal hover:bg-accent/90
            transition-all duration-200 ease-linear"
        >
          {isRegistering ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            "Register"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-text-muted">
        Have an account already?{" "}
        <Link
          to="/login"
          className="text-text-primary font-medium hover:text-accent hover:underline
            underline-offset-2 transition duration-200 ease-linear"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
