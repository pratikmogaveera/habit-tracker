import { z } from "zod";

export const NewUserFormSchema = z.object({
  name: z.string().min(6).max(30),
  email: z.string().email(),
});

export const NewHabitFormSchema = z.object({
  userId: z.string(),
  description: z.string().optional(),
  habitType: z.union([z.literal("ongoing"), z.literal("goal_based")]),
  startDate: z.date(),
  targetDays: z.string().optional(),
  endDate: z.date().optional(),
  isActive: z.boolean().default(true),
});
