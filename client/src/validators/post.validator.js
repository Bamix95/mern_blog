import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be under 150 characters"),

  category: z.enum(["Essays", "Technology", "Travel", "Craft", "Design"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),

  body: z
    .string()
    .min(100, "Post body must be at least 100 characters")
    .max(50000, "Post body is too long"),

  status: z.enum(["draft", "published"]),
});

export const editPostSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be under 150 characters"),

  category: z.enum(["Essays", "Technology", "Travel", "Craft", "Design"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),

  body: z
    .string()
    .min(100, "Post body must be at least 100 characters")
    .max(50000, "Post body is too long"),

  status: z.enum(["draft", "published"]),
});
