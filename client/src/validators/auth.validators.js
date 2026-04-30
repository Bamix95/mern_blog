import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password cannot exceed 128 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const registerSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),

  email: z
    .string("Email is required")
    .email("Please provide a valid email")
    .toLowerCase()
    .trim(),

  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z
    .string("Email is required")
    .email("Please provide a valid email")
    .toLowerCase()
    .trim(),

  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .trim(),
});
