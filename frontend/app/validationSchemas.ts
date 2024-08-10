import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
  status: z.optional(z.enum(["OPEN", "CLOSED", "IN_PROGRESS"])),
});

export const signupSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address.")
      .min(1, "Email is required."),
    first_name: z.optional(z.string()),
    last_name: z.optional(z.string()),
    password: z.string().min(1, "Password is required."),
    re_password: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match.",
    path: ["re_password"],
  });

export const emailSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});
