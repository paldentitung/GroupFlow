import { z } from "zod";

export const createTaskValidator = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().optional(),

  dueDate: z.string().optional(),

  priority: z.enum(["low", "medium", "high"]).optional(),

  assigneeId: z.string().min(1, "Assignee is required"),
});

export const updateTaskValidator = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),

  description: z.string().optional(),

  status: z.enum(["todo", "in_progress", "completed", "overdue"]).optional(),

  priority: z.enum(["low", "medium", "high"]).optional(),

  dueDate: z.string().optional(),

  assigneeId: z.string().optional(),
});

export const respondToTaskValidator = z.object({
  response: z.enum(["accepted", "rejected"], {
    errorMap: () => ({
      message: "Response must be accepted or rejected",
    }),
  }),
});
