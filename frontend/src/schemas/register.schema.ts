import { z } from "zod";
export const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string({ message: "Name is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
