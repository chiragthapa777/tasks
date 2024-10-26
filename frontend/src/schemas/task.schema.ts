import { z } from "zod";
export const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  body: z.string().min(1, { message: "Description is required" }),
  scheduledAt: z.string().min(1, { message: "Required" }),
});
