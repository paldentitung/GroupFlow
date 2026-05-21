import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),

  description: z.string().optional(),

  status: z.enum(["Active", "On Hold", "Completed"]).optional(),

  progress: z.coerce.number().min(0).max(100).optional(),
});
