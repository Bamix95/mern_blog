import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(8080),
  BASE_URL: z.string().url("BASE_URL must be a valid URL"),
  CLIENT_URL: z.string().url("CLIENT_URL must be a valid URL"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_TOKEN_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_TOKEN_EXPIRES: z.string().default("1d"),
  COOKIE_SECRET: z
    .string()
    .min(16, "COOKIE_SECRET must be at least 16 characters"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variable:\n");
  Object.entries(parsed.error.flatten().fieldErrors).forEach(
    ([key, errors]) => {
      console.error(`  ${key}: ${errors?.join(", ")}`);
    },
  );
  console.error("\nFix the above and restart the server.");
  process.exit(1);
}

export const Env = Object.freeze({
  ...parsed.data,
  IS_PRODUCTION: parsed.data.NODE_ENV === "production",
  IS_DEVELOPMENT: parsed.data.NODE_ENV === "development",
  IS_TEST: parsed.data.NODE_ENV === "test",
});
